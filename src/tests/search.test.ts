import * as Searches from "../routes/api/v1/searches/+server";
import * as SlugGet from "../routes/api/v1/searches/[...q]/+server";
import { expect, test } from "vitest";
import { db } from "$lib/db";
async function getUser(id?: string) {
  const email = id ?? "0";
  const query = await db.user.findUnique({
    where: {
      email: email,
    },
  });
  if (query) return query;
  else return await db.user.create({ data: { email: email } });
}

test("Get with empty string", async () => {
  const res = await Searches.GET();
  const url = await res.text();
  expect(url).toBe("https://duckduckgo.com");
});

test("Get", async () => {
  const queries = new Map<string, string>([
    ["test", "https://duckduckgo.com/?t=ffab&q=test"],
    ["c#", "https://duckduckgo.com/?t=ffab&q=c%23"],
    ["testwith/aslash", "https://duckduckgo.com/?t=ffab&q=testwith%2Faslash"],
    ["-r news/new", "https://old.reddit.com/r/news%2Fnew"],
    ["-g", "https://www.google.com"],
    ["-g e", "https://www.google.com/search?q=e"],
    ["-pcp", "https://pcpartpicker.com"],
    ["-pcp e", "https://pcpartpicker.com/search/?q=e"],
    ["-y", "https://www.youtube.com"],
    ["-y test", "https://www.youtube.com/results?search_query=test"],
    ["", "https://duckduckgo.com/?t=ffab&q="],
    ["-", ""],
    ["--", ""],
    ["-NOTREALCOMMAND", ""],
  ]);
  queries.forEach(async (result, search) => {
    const res = await SlugGet.GET({ params: { q: search }, locals: {} });
    const url = await res.text();
    expect(url).toBe(result);
  });
});

test("Post - Make valid command", async () => {
  const user = await getUser("1");
  const obj = {
    "-test1": {
      url: "https://example.org",
      searchable: false,
    },
  };
  const res = await Searches.POST({
    request: { json: () => obj },
    locals: { user: user },
  });
  expect(await res.text()).toBe(
    `POST - Added: {"-test1":{"url":"https://example.org","searchable":false}}`
  );
  await db.search.delete({ where: { userId: user.id, key: "-test1" } });
  await db.user.delete({ where: { id: user.id } });
});

test("Post - Make invalid command", async () => {
  const user = await getUser("1");
  const obj = {
    test2: {
      url: "https://example.org",
      searchable: false,
    },
  };
  const res = await Searches.POST({
    request: { json: () => obj },
    locals: { user: user },
  });
  expect(await res.text()).toBe(`POST - test2 was not added`);
  await db.user.delete({ where: { id: user.id } });
});

test("Put - Update valid command", async () => {
  const user = await getUser("1");
  const startingObj = {
    "-test1": {
      url: "https://example.org",
      searchable: false,
    },
  };
  const updatedObj = {
    "-test1": {
      url: "https://google.com",
      searchable: true,
    },
  };
  await Searches.POST({
    request: { json: () => startingObj },
    locals: { user: user },
  });
  const res = await Searches.PUT({
    request: { json: () => updatedObj },
    locals: { user: user },
  });
  expect(await res.text()).toBe(`PUT - Changed: ${JSON.stringify(updatedObj)}`);
  await db.search.delete({ where: { userId: user.id, key: "-test1" } });
  await db.user.delete({ where: { id: user.id } });
});

test("Put - Update invalid command", async () => {
  const user = await getUser("1");
  const updatedObj = {
    "-test1": {
      url: "https://google.com",
      searchable: true,
    },
  };
  const res = await Searches.PUT({
    request: { json: () => updatedObj },
    locals: { user: user },
  });
  expect(await res.text()).toBe(`PUT - -test1 is not a command`);
  await db.user.delete({ where: { id: user.id } });
});

test("Delete - Delete valid command", async () => {
  const user = await getUser("1");
  const startingObj = {
    "-test1": {
      url: "https://example.org",
      searchable: false,
    },
  };
  const deleteObj = {
    id: "-test1",
  };
  await Searches.POST({
    request: { json: () => startingObj },
    locals: { user: user },
  });
  const res = await Searches.DELETE({
    request: { json: () => deleteObj },
    locals: { user: user },
  });
  expect(await res.text()).toBe(`DELETE - -test1 was removed`);
  await db.user.delete({ where: { id: user.id } });
});
