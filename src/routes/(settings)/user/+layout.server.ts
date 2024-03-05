import { db } from "$lib/db";
import type { User } from "@prisma/client";
import type { LayoutServerLoad } from "../$types";

export const load = (async ({ locals }) => {
  const user = locals.user as User;
  const searches = await db.search.findMany({ where: { userId: user.id } });

  return {
    user,
    searches,
  };
}) satisfies LayoutServerLoad;
