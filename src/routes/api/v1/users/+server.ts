import { error } from "@sveltejs/kit";
import { db } from "$lib/db.js";

type MyUrl = { url: string; searchable: boolean };

function isString(value: unknown): value is string {
  return typeof value == "string";
}
function isBooleanLike(value: unknown): boolean {
  if (typeof value == "boolean") return true;
  if (!isString(value)) return false;
  if (value.toLowerCase() === "true" || value.toLowerCase() === "false")
    return true;
  return false;
}

// update commands
export async function PUT({ request, locals }): Promise<Response> {
  const { user } = locals;
  let obj: { string: [MyUrl] };

  let message = "";
  let status = 200;
  try {
    obj = await request.json();
  } catch (_) {
    error(400, "invalid json");
  }
  const k = Object.keys(obj)[0];
  const v: MyUrl = obj[k];

  // validate url and searchable
  try {
    const isDashed = k.charAt(0) === "-" && k.charAt(1) !== "-";
    if (!isString(v.url) || !isBooleanLike(v.searchable) || !isDashed) {
      return new Response(`PUT - ${k} is not a command`, { status: 400 });
    }

    const query = await db.search.findUnique({
      where: {
        key: k,
        userId: user.id,
      },
      select: {
        key: true,
        url: true,
        searchable: true,
      },
    });
    if (!query) {
      return new Response(`PUT - ${k} is not a command`, { status: 400 });
    }
    const data = {
      key: k,
      url: v.url,
      searchable: v.searchable,
    };
    if (JSON.stringify(data) === JSON.stringify(query)) {
      return new Response(`PUT - Unchanged: ${JSON.stringify(obj)}`, {
        status: 200,
      });
    }
    await db.search.update({
      where: {
        key: k,
        userId: user.id,
      },
      data: {
        ...data,
      },
    });
    message = `PUT - Changed: ${JSON.stringify(obj)}`;
  } catch (_) {
    message = `Error - Input was ${k}`;
    status = 400;
  }
  return new Response(message, { status: status });
}

// delete commands
export async function DELETE({ request, locals }): Promise<Response> {
  const { user } = locals;
  let obj: { id: string };
  try {
    obj = await request.json();
  } catch (_) {
    error(400, "invalid json");
  }
  const v = obj["id"];

  // check if request is valid
  if (!isString(v) || v.charAt(0) !== "-") error(400, "invalid json");
  // check if key exists
  const query = await db.search.findUnique({
    where: {
      key: v,
      userId: user.id,
    },
  });
  if (!query) {
    return new Response(`DELETE - ${v} was not present`, { status: 400 });
  }
  await db.search.delete({
    where: {
      key: v,
      userId: user.id,
    },
  });
  return new Response(`DELETE - ${v} was removed`, { status: 200 });
}
