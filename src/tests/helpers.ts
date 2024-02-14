import { db } from "$lib/db";
import type { User } from "@prisma/client";
import { randomUUID } from "crypto";

export async function getUser(isAdmin?: boolean) {
  const name = randomUUID();
  const query = await db.user.findUnique({
    where: {
      name,
    },
  });
  if (query) return query;
  else return await db.user.create({ data: { name, isAdmin } });
}

export async function deleteUser(user: User) {
  await db.user.delete({
    where: { name: user.name },
  });
}
