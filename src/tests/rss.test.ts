import { describe, expect, test } from "vitest";
import * as rss from "$lib/rss";
import { env } from "$env/dynamic/private";
const key = env.rss_api_key || "";
const url = env.rss_url || "";

describe("Check rss working or not", () => {
  const fqdm = `https://${url}`;
  test("See if server is reachable", async () => {
    const res = await fetch(fqdm, {
      method: "GET",
    });
    expect(res.status).toBe(200);
  });
  test("See if api key is good", async () => {
    const res = await fetch(fqdm, {
      method: "GET",
    });
    expect(res.status).toBe(200);
  });
  test("See if server returned items", async () => {
    const res = await rss.getNews(url, key);
    expect(res.items).toBeTruthy();
  });
});
