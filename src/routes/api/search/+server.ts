import { error } from "@sveltejs/kit";
import { env } from "$env/dynamic/private";
import crypto from "node:crypto";
export const _API_KEY = env.api_key ?? crypto.randomBytes(32).toString("hex");
console.log(_API_KEY);

const data = {
  "-4": {
    url: "https://boards.4channel.org/",
    searchable: true,
  },
  "-g": {
    url: "https://www.google.com/search?q=",
    searchable: true,
  },
  "-r": {
    url: "https://www.reddit.com/r/",
    searchable: true,
  },
  "-t": {
    url: "https://translate.google.com/?sl=auto&tl=en&text=",
    searchable: true,
  },
  "-w": {
    url: "https://www.wolframalpha.com/input/?i=",
    searchable: true,
  },
  "-y": {
    url: "https://www.youtube.com/results?search_query=",
    searchable: true,
  },
  "-pcp": {
    url: "https://pcpartpicker.com/search/?q=",
    searchable: true,
  },
};

function isBool(value: unknown): value is boolean {
  return typeof value == "boolean";
}
function isString(value: unknown): value is string {
  return typeof value == "string";
}
function checkApiKey(request) {
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

function logResponse(
  method: string,
  message: string,
  request: string,
  status: number
) {
  if (request != "") request = " from " + request;
  if (method === "POST" && message === "")
    console.log(`${method.toUpperCase()} - Returned empty string${request}`);
  else if (method === "POST")
    console.log(`${method.toUpperCase()} - Returned ${message}${request}`);
  else console.log(message);
  return new Response(message, { status: status });
}

// retrieve all commands
export function GET(): Response {
  return new Response(JSON.stringify(data), { status: 200 });
}

// perform a search
export async function POST({ request }): Promise<Response> {
  const input: { text: string; engine: string } = await request.json();
  let { text, engine } = input;
  if (!engine) engine = "https://duckduckgo.com/?t=ffab&q=";
  const logText = text;
  text = text.trim();

  // return regular search if no command provided
  if (!text.startsWith("-"))
    return logResponse("POST", engine + encodeURIComponent(text), logText, 200);

  let keyText: string = "";
  let searchText: string = "";

  if (text.includes(" ")) {
    keyText = text.substring(0, text.indexOf(" "));
    searchText = text.substring(text.indexOf(" ") + 1);
  } else {
    keyText = text;
  }
  keyText = keyText.toLowerCase();

  if (!(keyText in data)) return logResponse("POST", "", logText, 400);

  const { url, searchable } = data[keyText];

  // returns url if command is not searchable
  if (searchable == false) return logResponse("POST", url, logText, 200);

  // returns cleaned url if no searchtext is provided
  if (searchText.trim() === "") {
    const searchParams = ["/r/", "/input", "/results", "/search"];
    let temp = url;
    searchParams.forEach((item) => {
      temp = temp.split(item)[0];
    });
    return logResponse("POST", temp, logText, 200);
  }

  // return url with search
  return logResponse(
    "POST",
    url + encodeURIComponent(searchText),
    logText,
    200
  );
}

// may add many commands at once
export async function PUT({ request }): Promise<Response> {
  const { message, valid } = checkApiKey(request);
  if (!valid) return new Response(message, { status: 400 });
  let input: object;
  let keys: string[];

  // validate json format
  try {
    input = await request.json();
    keys = Object.keys(input);
  } catch (e) {
    throw error(400, "invalid json");
  }

  const logAccum: string[] = [];
  keys.forEach((k) => {
    // validate url and searchable
    try {
      const isDashed = k.charAt(0) === "-" && k.charAt(1) !== "-";
      if (
        !isString(input[k].url) ||
        !isBool(input[k].searchable) ||
        !isDashed
      ) {
        logAccum.push(`PUT - ${k} was not added`);
        return;
      }

      const exists = k in data;
      const updatedData = input[k];
      if (!exists) {
        data[k] = updatedData;
        logAccum.push(`PUT - Added: ${k}: ${JSON.stringify(data[k])}`);
      } else if (
        data[k].url !== updatedData.url ||
        data[k].searchable !== updatedData.searchable
      ) {
        data[k] = updatedData;
        logAccum.push(`PUT - Added: ${k}: ${JSON.stringify(data[k])}`);
      } else {
        logAccum.push(`PUT - Unchanged: ${k}`);
      }
    } catch (_) {
      return logAccum.push(`Error - Input was ${k}`);
    }
  });
  return logResponse("PUT", logAccum.join("\n"), "", 200);
}

// may delete multiple keys at once
export async function DELETE({ request }): Promise<Response> {
  const { message, valid } = checkApiKey(request);
  if (!valid) return new Response(message, { status: 400 });
  let input: { id: string[] };
  let keys: string[];
  try {
    input = await request.json();
    keys = input.id;
  } catch (_) {
    throw error(400, "invalid json");
  }
  const logAccum: string[] = [];
  keys.forEach((key) => {
    // check if request is valid
    if (!isString(key) || key.charAt(0) !== "-")
      throw error(400, "invalid json");
    // check if key exists
    if (!data.hasOwnProperty(key)) {
      logAccum.push(`DELETE - ${key} was not present`);
      return;
    }
    // ensure key/record is completely removed
    delete data[key];
    logAccum.push(`DELETE - ${key} was removed`);
  });
  return logResponse("DELETE", logAccum.join("\n"), "", 200);
}
