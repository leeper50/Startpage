import { redirect, type ServerLoadEvent } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { db } from "$lib/db.js";

export const load: PageServerLoad = async (event: ServerLoadEvent) => {
  const user = event.locals.user;

  if (!user.isAdmin) {
    throw redirect(302, "/login");
  }

  const id = event.params.id;
  const target = await db.user.findUnique({
    where: {
      id,
    },
  });

  if (!target) {
    throw redirect(302, "/login");
  }

  return { user, target };
};
