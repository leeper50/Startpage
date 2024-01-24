export async function getNews(
  url: string,
  key: string
): Promise<{
  valid: boolean;
  items?: NewsItem[];
}> {
  if (!key || !url) {
    return { valid: false };
  }
  let data: NewsItem[] = [{ title: "", url: "", site: "" }];
  const exp =
    /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
  const regex = new RegExp(exp);
  let rssurl = `${url}/api/greader.php/reader/api/0/stream/contents/?n=12`;
  if (regex.test(url)) rssurl = `https://${rssurl}`;
  else rssurl = `http://${rssurl}`;
  const res = await fetch(rssurl, {
    method: "POST",
    headers: {
      Authorization: `GoogleLogin auth=${key}`,
    },
  });

  if (!res.ok) {
    console.error("Problem with rss configuration. Status code:", res.status);
    return { valid: false };
  }

  const rss_data: RssData = await res.json();
  const cleanedFeed: NewsItem[] = [{ title: "", url: "", site: "" }];
  rss_data.items.forEach(({ title, canonical, origin }) =>
    cleanedFeed.push({
      title: title,
      url: canonical[0].href,
      site: origin.htmlUrl,
    })
  );

  data = cleanedFeed.slice(1, 12);
  return { valid: true, items: data };
}
