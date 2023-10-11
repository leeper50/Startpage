import { error } from "@sveltejs/kit";
import { env } from "$env/dynamic/private";
import { client } from "$lib/db.js";
import crypto from "node:crypto";
export const _API_KEY =
  env.search_api_key ?? crypto.randomBytes(32).toString("hex");
if (!env.search_api_key) console.log(_API_KEY);

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
async function validateInput(
  request: Request
): Promise<{ keys: string[]; input: object }> {
  const { message, valid } = checkApiKey(request);
  if (!valid) throw error(400, message);
  let input: object;
  let keys: string[];
  try {
    input = await request.json();
    keys = Object.keys(input);
  } catch (_) {
    throw error(400, "invalid json");
  }
  return { keys, input };
}
function checkApiKey(request: Request) {
  if (!request.headers.get("api_key")) {
    const message = "No api key in header";
    console.log(message);
    return { message: message, valid: false };
  } else if (request.headers.get("api_key") != _API_KEY) {
    const message = "Invalid api key";
    console.log(message);
    return { message: message, valid: false };
  } else return { message: "Valid api check", valid: true };
}
function logResponse(message: string, request: string, status: number) {
  if (request != "") request = " from " + request;
  console.log(message);
  return new Response(message, { status: status });
}

// default get
export async function GET(): Promise<Response> {
  console.log(`GET - Default get (empty string)`);
  return new Response("https://duckduckgo.com", { status: 200 });
}

// add commands
export async function POST({ request }): Promise<Response> {
  const { keys, input } = await validateInput(request);

  const logAccum: string[] = [];
  for (const i in keys) {
    const k = keys[i];
    // validate url and searchable
    try {
      const isDashed = k.charAt(0) === "-" && k.charAt(1) !== "-";
      if (
        !isString(input[k].url) ||
        !isBooleanLike(input[k].searchable) ||
        !isDashed
      ) {
        logAccum.push(`POST - ${k} was not added`);
        continue;
      }

      const exists = client.exists(k);
      const updatedData = {
        url: input[k].url,
        searchable: input[k].searchable.toString(),
      };
      if (!(await exists)) {
        client.hSet(k, updatedData);
        logAccum.push(`POST - Added: ${k}: ${JSON.stringify(updatedData)}`);
      } else {
        logAccum.push(`POST - Not Added: ${k}`);
      }
    } catch (_) {
      logAccum.push(`Error - Input was ${k}`);
    }
  }
  return logResponse(logAccum.join("\n"), "", 200);
}

// update commands
export async function PUT({ request }): Promise<Response> {
  const { keys, input } = await validateInput(request);

  const logAccum: string[] = [];
  for (const i in keys) {
    const k = keys[i];
    // validate url and searchable
    try {
      const isDashed = k.charAt(0) === "-" && k.charAt(1) !== "-";
      if (
        !isString(input[k].url) ||
        !isBooleanLike(input[k].searchable) ||
        !isDashed
      ) {
        logAccum.push(`PUT - ${k} was not added`);
      }

      const exists = await client.exists(k);
      const updatedData = {
        url: input[k].url,
        searchable: input[k].searchable.toString(),
      };
      if (!exists) {
        logAccum.push(`PUT - Not Present: ${k}`);
        continue;
      }
      const presentData = await client.hGetAll(k);
      if (JSON.stringify(presentData) === JSON.stringify(updatedData)) {
        logAccum.push(`PUT - Unchanged: ${k}: ${JSON.stringify(updatedData)}`);
        continue;
      }
      client.hSet(k, updatedData);
      logAccum.push(`PUT - Changed: ${k}: ${JSON.stringify(updatedData)}`);
    } catch (_) {
      logAccum.push(`Error - Input was ${k}`);
    }
  }
  return logResponse(logAccum.join("\n"), "", 200);
}

// delete commands
export async function DELETE({ request }): Promise<Response> {
  const { input } = await validateInput(request);
  const logAccum: string[] = [];
  for (const i in input["id"]) {
    const key = input["id"][i];
    // check if request is valid
    if (!isString(key) || key.charAt(0) !== "-")
      throw error(400, "invalid json");
    // check if key exists
    if (!(await client.exists(key))) {
      logAccum.push(`DELETE - ${key} was not present`);
      continue;
    }
    // ensure key/record is completely removed
    client.del(key);
    logAccum.push(`DELETE - ${key} was removed`);
  }
  return logResponse(logAccum.join("\n"), "", 200);
}
