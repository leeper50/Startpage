import type { PageServerLoad, Actions } from "./$types";
import { redirect, fail } from "@sveltejs/kit";
import { createUser, loginUser } from "$lib/user.model";

export const load: PageServerLoad = (event) => {
  const user = event.locals.user;

  if (user) {
    throw redirect(302, "/settings");
  }
};

export const actions: Actions = {
  signup: async (event) => {
    const formData = Object.fromEntries(await event.request.formData());
    
    if (formData.signupPassword !== formData.signupPasswordConfirm) {
      return fail(400, {
        error: "Passwords do not match",
      });
    }

    // Verify that we have an email and a password
    if (!formData.signupEmail || !formData.signupPassword) {
      return fail(400, {
        error: "Missing email or password",
      });
    }

    const { signupEmail, signupPassword } = formData as { signupEmail: string; signupPassword: string };

    // Create a new user
    const { error } = await createUser(signupEmail, signupPassword);

    // If there was an error, return an invalid response
    if (error) {
      return fail(500, {
        error,
      });
    }

    // Redirect to the login page
    throw redirect(302, "/login");
  },
  login: async (event) => {
    const formData = Object.fromEntries(await event.request.formData());
    
    if (formData.loginPassword !== formData.loginPasswordConfirm) {
      return fail(400, {
        error: "Passwords do not match",
      });
    }

    if (!formData.loginEmail || !formData.loginPassword) {
      return fail(400, {
        error: "Missing email or password",
      });
    }

    const { loginEmail, loginPassword } = formData as { loginEmail: string; loginPassword: string };

    const { error, token } = await loginUser(loginEmail, loginPassword);

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
      maxAge: 60 * 60 * 24, // 1 day
    });

    throw redirect(302, "/settings");
  },
};
