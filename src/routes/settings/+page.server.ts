import { client } from "$lib/db.js";
import * as uuid from "uuid";
import { fail } from "@sveltejs/kit";

export async function load({ cookies }) {
  const id = cookies.get("id");
  if (typeof id == "undefined")
    cookies.set("id", uuid.v4(), { path: "/", secure: false });
  return {id: id};
}

export const actions = {
  default: async ({ request, cookies }) => {
    const formData = Object.fromEntries(await request.formData());
    if (
      !(formData.fileToUpload as File).name ||
      (formData.fileToUpload as File).name === "undefined"
    ) {
      return fail(400, {
        error: true,
        message: "You must provide a file to upload",
      });
    }

    const { fileToUpload } = formData as { fileToUpload: File };

    const id: string | undefined = cookies.get("id");
    if (typeof id == "undefined")
      return fail(400, {
        error: true,
        message: "Couldn't find cookie",
      });

    const linkData = await fileToUpload.text();
    client.set(id, linkData);

    return {
      success: true,
    };
  }
};
