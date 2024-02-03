import { redirect, type ServerLoadEvent } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { db } from "$lib/db.js";

export const load: PageServerLoad =  async (event: ServerLoadEvent) => {
  const user = event.locals.user;

  if (!user || !user.isAdmin) {
    throw redirect(302, "/login");
  }

  const users = await db.user.findMany();

  return {user, users}
};
