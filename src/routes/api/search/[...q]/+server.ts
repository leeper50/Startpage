import { db } from "$lib/db";
import { default_search } from "../default";

// perform a search
export async function GET({ params, locals }): Promise<Response> {
  let text = params.q;
  const engine = "https://duckduckgo.com/?t=ffab&q=";
  text = text.trim();

  // return regular search if no command provided
  if (!text.startsWith("-"))
    return new Response(engine + encodeURIComponent(text), { status: 200 });

  let keyText = "";
  let searchText = "";

  if (text.includes(" ")) {
    keyText = text.substring(0, text.indexOf(" "));
    searchText = text.substring(text.indexOf(" ") + 1);
  } else {
    keyText = text;
  }
  keyText = keyText.toLowerCase();
  function runSearch(url: string, searchable: boolean) {
    // returns url if command is not searchable
    if (searchable === false) return new Response(url, { status: 200 });
    // returns cleaned url if no searchtext is provided
    if (searchText.trim() === "") {
      const searchParams = [
        "/input",
        "/results",
        "/search",
        "/wiki",
        "/c/",
        "/r/",
      ];
      let temp = url;
      searchParams.forEach((item) => {
        temp = temp.split(item)[0];
      });
      return new Response(temp, { status: 200 });
    }
    // return url with search
    return new Response(url + encodeURIComponent(searchText), { status: 200 });
  }
  // Check user's searches
  if (locals.user) {
    const resp = await db.search.findUnique({
      select: {
        key: true,
        url: true,
        searchable: true,
      },
      where: {
        userId: locals.user.id,
        key: keyText,
      },
    });
    if (resp) {
      return runSearch(resp.url, resp.searchable);
    }
  }
  if (keyText in default_search) {
    // Check default search
    const { url, searchable } = default_search[keyText];
    return runSearch(url, searchable);
  } else {
    // Command not present
    return new Response("", { status: 400 });
  }
}
