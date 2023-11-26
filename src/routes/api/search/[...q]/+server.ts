import { env } from "$env/dynamic/private";
import { client } from "$lib/db.js";
import type { MyURL } from "$lib/fallback.js";
export const _REDIS_HOST = env.redis_host ?? "localhost";
export const _REDIS_PORT = env.redis_port ?? "6379";

function logResponse(message: string, request: string, status: number) {
  if (request != "") request = " from " + request;
  if (message === "") console.log(`GET - Returned empty string${request}`);
  else console.log(`GET - Returned ${message}${request}`);
  return new Response(message, { status: status });
}

// perform a search
export async function GET({ params }): Promise<Response> {
  let text = params.q;
  const engine = "https://duckduckgo.com/?t=ffab&q=";
  const logText = text;
  text = text.trim();

  // return regular search if no command provided
  if (!text.startsWith("-"))
    return logResponse(engine + encodeURIComponent(text), logText, 200);

  let keyText: string = "";
  let searchText: string = "";

  if (text.includes(" ")) {
    keyText = text.substring(0, text.indexOf(" "));
    searchText = text.substring(text.indexOf(" ") + 1);
  } else {
    keyText = text;
  }
  keyText = keyText.toLowerCase();

  if (!(await client.exists(keyText))) return logResponse("", logText, 400);

  const { url, searchable } = await client.hGetAll(keyText) as MyURL;

  // returns url if command is not searchable
  if (searchable === "false") return logResponse(url, logText, 200);

  // returns cleaned url if no searchtext is provided
  if (searchText.trim() === "") {
    const searchParams = ["/input", "/results", "/search", "/wiki", "/c/", "/r/"];
    let temp = url;
    searchParams.forEach((item) => {
      temp = temp.split(item)[0];
    });
    return logResponse(temp, logText, 200);
  }

  // return url with search
  return logResponse(url + encodeURIComponent(searchText), logText, 200);
}
