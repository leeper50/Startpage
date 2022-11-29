import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import data from './commands.json'

/* takes user input as string
 * returns a url combined with a string if url is searchable
 */

export const POST: RequestHandler = async ({ request }) => {
  try {
    let {text} = await request.json();
    text = text.trim();

    if (text === "-") {
      return json("");
    }

    // return regular search if no command provided
    if (!text.startsWith("-")) {
      return json("https://duckduckgo.com/?t=ffab&q=" + encodeURIComponent(text));
    }

    let keyText: string = "";
    let searchText: string = "";

    if (text.includes(" ")) {
      keyText = text.substring(0, text.indexOf(" "));
      searchText = text.substring(text.indexOf(" ") + 1);
    } else {
      keyText = text;
    }
    keyText = keyText.toLowerCase();

    if (data[keyText] === undefined) {
      return json("");
    }
    const { url, searchable } = data[keyText];

    // returns url if command is not searchable
    if (searchable == false) {
      return json(url);
    }

    // returns cleaned url if no searchtext is provided
    if (searchText.trim() === "") {
      const search_params = ["/r/", "/input", "/results"];
      let temp = url;
      search_params.forEach((item) => {
        temp = temp.split(item)[0];
      });
      return json(temp);
    }
    // return url with search
    // res.status(200).send(url + encodeURIComponent(searchText));
    return json(url + encodeURIComponent(searchText));
  } catch (e) {
    console.warn(e);
    // res.status(500).send("Something went wrong.");
    return json("Something went wrong");
  }
};
