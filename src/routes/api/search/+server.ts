import { error } from "@sveltejs/kit";
import { API_KEY } from "$env/static/private";

let data = {
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
    url: "https://lt.dellhplaptop.xyz/?source=auto&target=en&q=",
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
    url: "https://pcpartpicker.com/",
    searchable: false,
  },
};

function isString(value: unknown): value is string {
  return typeof value == "string";
}
function isBool(value: unknown): value is boolean {
  return typeof value == "boolean";
}
function checkApiKey(request) {
  if (!request.headers.get("api_key")) {
    const message = "No api key in header";
    console.log(message);
    return { message: message, valid: false };
  } else if (request.headers.get("api_key") != API_KEY) {
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
  let requestPresent = request != "" ? true : false;
  if (requestPresent) request = " from " + request;
  if (message === "")
    console.log(`${method.toUpperCase()} - Returned empty string${request}`);
  else console.log(`${method.toUpperCase()} - Returned ${message}${request}`);
  return new Response(message, { status: status });
}

// retrieve all commands
export function GET() {
  return new Response(JSON.stringify(data), { status: 200 });
}

// perform a search
export async function POST({ request }) {
  let input: { text: string; engine: string } = await request.json();
  let { text, engine } = input;
  if (!engine) engine = "https://duckduckgo.com/?t=ffab&q=";
  const logText = text;
  text = text.trim();

  if (text === "-") return logResponse("post", "", logText, 400);

  // return regular search if no command provided
  if (!text.startsWith("-"))
    return logResponse("post", engine + encodeURIComponent(text), logText, 200);

  let keyText: string = "";
  let searchText: string = "";

  if (text.includes(" ")) {
    keyText = text.substring(0, text.indexOf(" "));
    searchText = text.substring(text.indexOf(" ") + 1);
  } else {
    keyText = text;
  }
  keyText = keyText.toLowerCase();

  if (data[keyText] === undefined) return logResponse("post", "", logText, 400);

  const { url, searchable } = data[keyText];

  // returns url if command is not searchable
  if (searchable == false) return logResponse("post", url, logText, 200);

  // returns cleaned url if no searchtext is provided
  if (searchText.trim() === "") {
    const searchParams = ["/r/", "/input", "/results"];
    let temp = url;
    searchParams.forEach((item) => {
      temp = temp.split(item)[0];
    });
    return logResponse("post", temp, logText, 200);
  }

  // return url with search
  return logResponse(
    "post",
    url + encodeURIComponent(searchText),
    logText,
    200
  );
}

// may add many commands at once
export async function PUT({ request }) {
  const authCheck = checkApiKey(request);
  if (!authCheck.valid) return new Response(authCheck.message, { status: 400 });
  let input: {};
  let keys: string[];

  // validate json format
  try {
    input = await request.json();
    keys = Object.keys(input);
  } catch (e) {
    throw error(400, "invalid json");
  }

  // validate keys (contain -)
  keys = keys.filter((k) => k.charAt(0) === "-" && k.charAt(1) !== "-");

  keys.forEach((k) => {
    // validate url and searchable
    try {
      let url: string = input[k].url;
      let searchable: boolean = input[k].searchable;
      if (!isString(url) || !isBool(searchable)) return;
      // maybe check if url is valid
      const keyExist = k in data ? true : false;
      data[k] = { url: url, searchable: searchable };
      if (!keyExist)
        console.log(`PUT - Added: ${k}: ${JSON.stringify(data[k])}`);
      else console.log(`PUT - Updated: ${k}: ${JSON.stringify(data[k])}`);
    } catch (_) {
      return;
    }
  });
  return new Response(JSON.stringify(data), { status: 200 });
}

// may delete 1 key at a time
export async function DELETE({ request }) {
  const authCheck = checkApiKey(request);
  if (!authCheck.valid) return new Response(authCheck.message, { status: 400 });
  let input: { id: string };
  try {
    input = await request.json();
    // check if request is valid
    if (!isString(input.id) || input.id.charAt(0) !== "-")
      throw error(400, "invalid json");
    // check if key exists
    if (!data.hasOwnProperty(input.id))
      return logResponse("delete", `${input.id} was not present`, "", 200);
    // ensure key/record is completely removed
    const deletedData = data[input.id];
    delete data[input.id];
    return logResponse("delete", JSON.stringify(deletedData), "", 200);
  } catch (_) {
    throw error(400, "invalid json");
  }
}
