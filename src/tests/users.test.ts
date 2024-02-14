import { expect, test } from "vitest";
import { db } from "$lib/db";
import * as Users from "../routes/api/v1/users/+server";
import type { User } from "@prisma/client";
import { deleteUser, getUser } from "./helpers";

type TestableUser = Omit<User, "createdAt" | "updatedAt">;

test("PUT - User updates itself", async () => {
  const user = await getUser();
  const updatedData = { name: user.name, fancy: false };
  await Users.PUT({
    request: { json: async () => updatedData },
    locals: { user },
  });
  const result = (await db.user.findUnique({
    where: { name: user.name },
  })) as TestableUser;
  expect(result.fancy).toBe(false);
  await deleteUser(user);
});

test("PUT - User update invalid field", async () => {
  const user = await getUser();
  const updatedData = { name: user.name, fancy2: false };
  const response = await Users.PUT({
    request: { json: async () => updatedData },
    locals: { user },
  });
  expect(await response.text()).toBe("Invalid JSON");
  await deleteUser(user);
});

test("PUT - User updates another user", async () => {
  const user1 = await getUser();
  const user2 = await getUser();
  const updatedData = { name: user1.name, fancy2: false };
  const response = await Users.PUT({
    request: { json: async () => updatedData },
    locals: { user: user2 },
  });
  expect(await response.text()).toBe("Unauthorized Access");
  expect(user1.fancy).toBe(true);
  expect(user2.fancy).toBe(true);
  await deleteUser(user1);
  await deleteUser(user2);
});

test("PUT - Admin updates another user", async () => {
  const user1 = await getUser();
  const user2 = await getUser(true);
  const updatedData = { name: user1.name, fancy: false };
  const response = await Users.PUT({
    request: { json: async () => updatedData },
    locals: { user: user2 },
  });
  const result = (await db.user.findUnique({
    where: { name: user1.name },
  })) as TestableUser;
  expect(response.status).toBe(200);
  expect(result.fancy).toBe(false);
  await deleteUser(user1);
  await deleteUser(user2);
});

test("DELETE - User deletes itself", async () => {
  const user = await getUser();
  await Users.DELETE({ request: { json: async () => user }, locals: { user } });
  const result = await db.user.findUnique({ where: { name: user.name } });
  expect(result).toBe(null);
});

test("DELETE - User deletes another user", async () => {
  const user1 = await getUser();
  const user2 = await getUser();
  const response = await Users.DELETE({
    request: { json: async () => user1 },
    locals: { user: user2 },
  });
  const result = await db.user.findUnique({ where: { name: user1.name } });
  expect(await response.text()).toBe("Unauthorized Access");
  expect(response.status).toBe(403);
  expect(result).toBeTruthy();
  await deleteUser(user1);
  await deleteUser(user2);
});

test("DELETE - Admin deletes another user", async () => {
  const user1 = await getUser();
  const user2 = await getUser(true);
  const response = await Users.DELETE({
    request: { json: async () => user1 },
    locals: { user: user2 },
  });
  const result = await db.user.findUnique({ where: { name: user1.name } });
  expect(response.status).toBe(200);
  expect(result).toBe(null);
  await deleteUser(user2);
});
