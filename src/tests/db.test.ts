import { assertType, test } from "vitest";
import { db } from "$lib/db";
import type { Search, User } from "@prisma/client";

test("Create User", async () => {
  const data = { email: "0" };
  if (await db.user.findUnique({ where: data }))
    await db.user.delete({ where: data });
  const result = await db.user.create({ data });
  assertType<User>(result);
  await db.user.delete({ where: data });
});

test("Create Search", async () => {
  const user_data = { email: "0" };
  const user_result = await db.user.create({ data: user_data });
  const search_data = {
    key: "",
    url: "",
    searchable: true,
    userId: user_result.id,
  };
  const search_result = await db.search.create({
    data: search_data,
  });
  assertType<Search>(search_result);
  await db.search.deleteMany({ where: { userId: user_result.id } });
  await db.user.delete({ where: { id: user_result.id } });
});
