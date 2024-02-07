import data from "/static/links.yml";
import YAML from "yaml";
import { getNews } from "$lib/rss";

export async function load({ locals, cookies }) {
  if (!locals.user) return { page: data };
  const user = locals.user;

  // refresh cookie
  const token = cookies.get("AuthorizationToken");
  cookies.set("AuthorizationToken", token as string, {
    httpOnly: true,
    path: "/",
    secure: true,
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7,
  });
  if (!user.pageData) user.pageData = JSON.stringify(data);
  if (user.rssVisibility)
    try {
      const news = await getNews(user.rssUrl, user.rssApiKey);
      return Object.assign(news, { page: YAML.parse(user.pageData) });
    } catch {
      return { page: YAML.parse(user.pageData) };
    }
  return { page: YAML.parse(user.pageData) };
}
