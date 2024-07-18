import { error } from "@sveltejs/kit";
import { db } from "$lib/db.js";
import { engines } from "$lib/searchEngines";

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

// default get
export async function GET({ locals }): Promise<Response> {
  const { user } = locals;
  let engine: string;
  if (user && user.searchEngine in engines) {
    engine = engines[`${user.searchEngine}`];
  } else {
    engine = "https://duckduckgo.com/";
  }
  const domainEnd = engine.substring(8).indexOf("/") + 8;
  return new Response(engine.substring(0, domainEnd), { status: 200 });
}

// add commands
export async function POST({ request, locals }): Promise<Response> {
  const { user } = locals;
  let obj: { string: [MyUrl] };
  try {
    obj = await request.json();
  } catch (_) {
    error(400, "Invalid JSON");
  }
  const k = Object.keys(obj)[0];
  const v: MyUrl = obj[k];

  let message = "";
  let status = 200;
  try {
    const isDashed = k.charAt(0) === "-" && k.charAt(1) !== "-";
    if (!isString(v.url) || !isBooleanLike(v.searchable) || !isDashed) {
      return new Response(`POST - ${k} was not added`, { status: 400 });
    }
    const query = await db.search.findUnique({
      where: {
        key: k,
        userId: user.id,
      },
    });
    const data = {
      key: k,
      url: v.url,
      searchable: v.searchable,
    };
    if (!query) {
      await db.search.create({
        data: {
          ...data,
          userId: user.id,
        },
      });
      message = `POST - Added: ${JSON.stringify(obj)}`;
    } else {
      message = `POST - Not Added: ${k}`;
    }
  } catch (e) {
    console.log(e);
    message = e as string;
    status = 500;
  }
  return new Response(message, { status: status });
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
    error(400, "Invalid JSON");
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
    error(400, "Invalid JSON");
  }
  const v = obj["id"];

  // check if request is valid
  if (!isString(v) || v.charAt(0) !== "-") error(400, "Invalid JSON");
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
