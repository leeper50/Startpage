import { client } from "$lib/db.js";
import data from "./links.yml";
import YAML from "yaml";
import * as uuid from "uuid";
import { getNews } from "$lib/rss";
import { env } from "$env/dynamic/private";
const url = env.rss_url ?? "";
const key = env.rss_api_key ?? "";

export async function load({ cookies }) {
  const id = cookies.get("id");
  let linkData = data;
  if (typeof id == "undefined") cookies.set("id", uuid.v4(), { path: "/" });
  else if (client.exists(id)) {
    const content: string | null = await client.get(id);
    if (content) linkData = YAML.parse(content);
  }
  const test = await getNews(url, key);
  return Object.assign(test, { page: linkData });
}
