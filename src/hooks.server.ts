import { Sequelize, DataTypes, Model } from "sequelize";
import { env } from "$env/dynamic/private";

const host = env.POSTGRES_HOST || "localhost";
const port = parseInt(env.POSTGRES_PORT) || 5432;
const db = env.POSTGRES_DB || "postgres";
const user = env.POSTGRES_USER || "postgres";
const pass = env.POSTGRES_PASS || "postgres";

export let sequelize = new Sequelize({
  dialect: "postgres",
  host: host,
  port: port,
  database: db,
  username: user,
  password: pass,
});

let postgresFailed = false;
try {
  await sequelize.authenticate();
  console.log("Postgres connection has been established successfully.");
} catch (error) {
  console.log(error);
  console.log(`Check your variables: host =>`);
  console.log("Using sqlite3 as fallback");
  postgresFailed = true;
}

if (postgresFailed) {
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "test.sqlite",
  });
}

class User extends Model {
  declare firstName: string;
  declare lastName?: string;
  declare age?: number;
}

User.init(
  {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    age: {
      type: DataTypes.INTEGER,
    },
  },
  { sequelize }
);

// await User.sync();
await sequelize.sync({ force: true });
await User.create({ firstName: "A", age: 19 });
const test = new User({ firstName: "B", age: 20 });
test.save();

let t = await sequelize.transaction();
try {
  await User.create({ firstName: "C", age: 21 }, { transaction: t });
  await User.create({ firstName: "D", age: 19 }, { transaction: t });
  await t.commit();
} catch (error) {
  await t.rollback();
}

try {
  const result = await sequelize.transaction(async (t) => {
    await User.create({ firstName: "Some name", age: 23 }, { transaction: t });
    await User.create({ age: 24 }, { transaction: t });
    return user;
  });
} catch (error) {
  console.log("This one fails because no primary key");
}

let users = await User.findAll({
});
console.log(JSON.stringify(users, null, 2));

users = await User.findAll({
  attributes: ['age']
});
console.log(JSON.stringify(users, null, 2));

users = await User.findAll({
  where: {
    age: 19
  }
});
console.log(JSON.stringify(users, null, 2));
