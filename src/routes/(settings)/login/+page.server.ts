import type { PageServerLoad, Actions, RouteParams } from "./$types";
import { redirect, fail, type RequestEvent } from "@sveltejs/kit";
import { createUser, loginUser } from "$lib/user.model";

async function getToken(
  event: RequestEvent<RouteParams, "/(settings)/login">,
  name: string,
  password: string
) {
  const { error, token } = await loginUser(name, password);

  if (error) {
    return fail(401, {
      error,
    });
  }

  // Set the cookie
  event.cookies.set("AuthorizationToken", `Bearer ${token}`, {
    httpOnly: true,
    path: "/",
    secure: true,
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  throw redirect(302, "/settings");
}

function validateFormData(formData: {
  name?: string;
  password?: string;
  passwordConfirm?: string;
}) {
  const obj = { valid: true, msg: "" };
  if (formData.password !== formData.passwordConfirm) {
    obj.valid = false;
    obj.msg = "Passwords do not match";
  } else if (!formData.name || !formData.password) {
    obj.valid = false;
    obj.msg = "Missing name or password";
  }
  return obj;
}

export const load: PageServerLoad = (event) => {
  const user = event.locals.user;

  if (user) {
    throw redirect(302, "/settings");
  }
};

export const actions: Actions = {
  signup: async (event) => {
    const formData = Object.fromEntries(await event.request.formData());

    let { valid, msg } = validateFormData(formData);
    if (!valid) {
      return fail(400, { error: msg });
    }

    const { name, password } = formData as {
      name: string;
      password: string;
    };

    // Create a new user
    const { error } = await createUser(name, password);

    // If there was an error, return an invalid response
    if (error) {
      return fail(500, {
        error,
      });
    }

    // Login user
    return await getToken(event, name, password);
  },
  login: async (event) => {
    const formData = Object.fromEntries(await event.request.formData());

    if (formData.password !== formData.passwordConfirm) {
      return fail(400, {
        error: "Passwords do not match",
      });
    }

    if (!formData.name || !formData.password) {
      return fail(400, {
        error: "Missing name or password",
      });
    }

    const { name, password } = formData as {
      name: string;
      password: string;
    };

    return await getToken(event, name, password);
  },
};
