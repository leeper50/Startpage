import type { PageServerLoad } from "./$types";
import { env } from "$env/dynamic/private";
export const _RSS_API_KEY = env.rss_api_key ?? "";
export const _RSS_URL = env.rss_url ?? "";

export const load = (async () => {
  if (!_RSS_API_KEY || !_RSS_URL) return { valid: false };
  let valid: boolean = false;
  let data: { title: string; url: string }[] = [{title: "",url: ""}];
  const url = `https://${_RSS_URL}/api/greader.php/reader/api/0/stream/contents/?n=12`;
  await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `GoogleLogin auth=${_RSS_API_KEY}`,
    },
  })
    .then((res) => res.json())
    .then((rss_data) => {
      valid = true;
      const cleanedFeed: [{ title: string; url: string }] = [
        { title: "", url: "" },
      ];
      rss_data.items.forEach(({ title, canonical }) =>
        cleanedFeed.push({ title: title, url: canonical[0].href })
      );
      // Object will have at least 1 member
      data = cleanedFeed.slice(1, 12);
    })
    .catch((res) => {
      if (!res.ok) console.log("Problem with RSS config");
      valid = false;
    });
  // Object will have at least 1 member
  return { valid: valid, items: data };
}) satisfies PageServerLoad;
