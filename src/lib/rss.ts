export async function getNews(
  url: string,
  key: string
): Promise<{
  valid: boolean;
  items?: NewsItem[];
}> {
  if (!key || !url) {
    console.log("No RSS_URL or RSS_API_KEY set!");
    return { valid: false };
  }
  let data: NewsItem[] = [{ title: "", url: "", site: "" }];
  const rssurl = `https://${url}/api/greader.php/reader/api/0/stream/contents/?n=12`;

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
