import type { Handle } from "@sveltejs/kit";
import { env } from "$env/dynamic/private";
import jwt from "jsonwebtoken";

import { db } from "$lib/db";
import { secret } from "$lib/user.model";

const handle: Handle = async ({ event, resolve }) => {
  const authCookie = event.cookies.get("AuthorizationToken");

  if (authCookie) {
    // Remove Bearer prefix
    const token = authCookie.split(" ")[1];

    try {
      const jwtUser = jwt.verify(token, secret);
      if (typeof jwtUser === "string") {
        throw new Error("Something went wrong");
      }

      const user = await db.user.findUnique({
        where: {
          id: jwtUser.id,
        },
      });

      if (!user) {
        throw new Error("User not found");
      }

      event.locals.user = user;
    } catch (_) {}
  }

  return await resolve(event);
};

export { handle };
