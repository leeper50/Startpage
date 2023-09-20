import * as Server from "../routes/api/search/+server";
import * as SlugGet from "../routes/api/search/[q]/+server";
import { expect, test } from "vitest";

test("Get with empty string", async () => {
  const res = await Server.GET();
  const url = await res.text();
  expect(url).toBe("https://duckduckgo.com");
});

test("Get", async () => {
  const queries = new Map<string, string>([
    ["test", "https://duckduckgo.com/?t=ffab&q=test"],
    ["c#", "https://duckduckgo.com/?t=ffab&q=c%23"],
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
    const res = await SlugGet.GET({ params: { q: search } });
    const url = await res.text();
    expect(url).toBe(result);
  });
});

test("Post", async () => {
  const queries = new Map<string, { url?: any; searchable?: any }>([
    [
      "-test1",
      {
        url: "https://test.com",
        searchable: "false",
      },
    ],
    [
      "test2",
      {
        url: "https://test.com",
        searchable: "false",
      },
    ],
    [
      "-test3",
      {
        url: 5,
        searchable: "false",
      },
    ],
    [
      "-test4",
      {
        url: "https://test.com",
        searchable: 5,
      },
    ],
    ["-test5", {}],
    [
      "-test6",
      {
        url: "",
      },
    ],
    [
      "-test7",
      {
        searchable: "true",
      },
    ],
  ]);
  const results = new Map<string, string>([
    [
      "-test1",
      `POST - Added: -test1: ${JSON.stringify(queries.get("-test1"))}`,
    ],
    ["test2", `POST - test2 was not added`],
    ["-test3", `POST - -test3 was not added`],
    ["-test4", `POST - -test4 was not added`],
    ["-test5", `POST - -test5 was not added`],
    ["-test6", `POST - -test6 was not added`],
    ["-test7", `POST - -test7 was not added`],
  ]);
  queries.forEach(async (value, key) => {
    const res = await Server.POST({
      request: {
        headers: {
          get: () => {
            return Server._API_KEY;
          },
        },
        json: () => {
          return { [key]: value };
        },
      },
    });
    const url = await res.text();
    expect(url).toBe(results.get(key));
  });
});

test("Put", async () => {
  const queries = new Map<string, { url?: any; searchable?: any }>([
    [
      "-g",
      {
        url: "https://duckduckgo.com",
        searchable: "true",
      },
    ],
    [
      "-g",
      {
        url: "https://google.com",
        searchable: "true",
      },
    ],
    [
      "-notacommand",
      {
        url: "https://test.com",
        searchable: "false",
      },
    ],
  ]);
  const results = new Map<string, string>([
    ["-g", `PUT - Changed: -g: ${JSON.stringify(queries.get("-g"))}`],
    ["-d", `PUT - Changed: -d: ${JSON.stringify(queries.get("-d"))}`],
    ["-notacommand", `PUT - Not Present: -notacommand`],
  ]);
  queries.forEach(async (value, key) => {
    const res = await Server.PUT({
      request: {
        headers: {
          get: () => {
            return Server._API_KEY;
          },
        },
        json: () => {
          return { [key]: value };
        },
      },
    });
    const url = await res.text();
    expect(url).toBe(results.get(key));
  });
});

test("Delete", async () => {
  const queries = new Map<string, string>([
    ["-pcp", "DELETE - -pcp was removed"],
    ["-NOTAREALCOMMAND", "DELETE - -NOTAREALCOMMAND was not present"],
    ["-", "DELETE - - was not present"],
  ]);
  queries.forEach(async (result, search) => {
    const res = await Server.DELETE({
      request: {
        headers: {
          get: () => {
            return Server._API_KEY;
          },
        },
        json: () => {
          return {
            id: [search],
          };
        },
      },
    });
    const url = await res.text();
    expect(url).toBe(result);
  });
});
