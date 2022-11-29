import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import data from "./commands.json";

/* takes user input as string
 * returns a url combined with a string if url is searchable
 */
interface SearchRequest {
  text: string;
}
export const POST: RequestHandler = async ({ request }) => {
  try {
    let { text }: SearchRequest = await request.json();
    const logReturn = (url: string) => {
      const returnText = url !== "" ? url : "empty string";
      console.log(`Returned ${returnText}`);
      return json(url);
    };
    text = text.trim();

    if (text === "-") {
      return logReturn("");
    }

    // return regular search if no command provided
    if (!text.startsWith("-")) {
      return logReturn(
        "https://duckduckgo.com/?t=ffab&q=" + encodeURIComponent(text)
      );
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
      return logReturn("");
    }
    const { url, searchable } = data[keyText];

    // returns url if command is not searchable
    if (searchable == false) {
      return logReturn(url);
    }

    // returns cleaned url if no searchtext is provided
    if (searchText.trim() === "") {
      const searchParams = ["/r/", "/input", "/results"];
      let temp = url;
      searchParams.forEach((item) => {
        temp = temp.split(item)[0];
      });
      return logReturn(temp);
    }

    // return url with search
    return logReturn(url + encodeURIComponent(searchText));
  } catch (e) {
    console.warn(e);
    return json("Something went wrong");
  }
};
