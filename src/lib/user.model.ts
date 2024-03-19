import { building } from "$app/environment";
import { env } from "$env/dynamic/private";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { db } from "$lib/db";
import { randomUUID } from "crypto";
export const secret = building ? "" : env.JWT_ACCESS_SECRET || randomUUID();
if (!building && !env.JWT_ACCESS_SECRET)
  console.log(
    `You should save this in the JWT_ACCESS_SECRET environment variable if you want to persist user auth tokens between container runs:\n${secret}`
  );

const createUser = async (name: string, password: string) => {
  // Check if user exists
  const user = await db.user.findUnique({
    where: {
      name,
    },
  });

  if (user) {
    return {
      error: "User already exists",
    };
  }

  const anyUser = await db.user.findFirst();
  const firstUser = anyUser === null ? true : false;

  try {
    const user = await db.user.create({
      data: {
        name,
        password: await bcrypt.hash(password, 10),
        isAdmin: firstUser,
      },
    });

    return { user };
  } catch (error) {
    return {
      error: "Something went wrong",
    };
  }
};

const loginUser = async (name: string, password: string) => {
  // Check if user exists
  const user = await db.user.findUnique({
    where: {
      name,
    },
  });

  if (!user) {
    return {
      error: "Invalid credentials",
    };
  }

  // Verify the password
  const passwordIsValid = await bcrypt.compare(password, user.password);

  if (!passwordIsValid) {
    return {
      error: "Invalid credentials",
    };
  }

  const jwtUser = {
    id: user.id,
    name: user.name,
  };

  const token = jwt.sign(jwtUser, secret, {
    expiresIn: "7d",
  });

  return { token };
};

const refreshToken = async (name: string, userToken: string) => {
  // Check if user exists
  const user = await db.user.findUnique({
    where: {
      name,
    },
  });

  if (!user) {
    return {
      error: "Invalid credentials",
    };
  }

  // Verify the token
  const tokenIsValid = jwt.verify(userToken, secret);

  if (!tokenIsValid) {
    return {
      error: "Token Expired",
    };
  }

  const jwtUser = {
    id: user.id,
    name: user.name,
  };

  const token = jwt.sign(jwtUser, secret, {
    expiresIn: "7d",
  });

  return { token };
};

export { createUser, loginUser, refreshToken };
