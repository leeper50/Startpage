import { redirect, type ServerLoadEvent } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import default_links from "/static/links.yml"

export const load: PageServerLoad = (event: ServerLoadEvent) => {
  const user = event.locals.user;

  if (!user) { 
    throw redirect(302, "/login");
  }
  return {user, default_links};
};

export const actions = {
  logout: async (event) => {
    event.cookies.delete("AuthorizationToken", {
      path: "/",
    });
    throw redirect(302, "/login");
  },
};
