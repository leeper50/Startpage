import { _API_KEY, DELETE, POST, PUT } from "../routes/api/search/+server";
import { expect, test } from "vitest";

test("Post - (no engine)", async () => {
  const queries = new Map<string, string>([
    ["test", "https://duckduckgo.com/?t=ffab&q=test"],
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
    const res = await POST({
      request: {
        json: () => {
          return {
            text: search,
          };
        },
      },
    });
    const url = await res.text();
    expect(url).toBe(result);
  });
});

test("Post - (engine provided)", async () => {
  const queries = new Map<string, string>([
    ["test", "https://www.google.com/search?q=test"],
    ["-g", "https://www.google.com"],
    ["-g e", "https://www.google.com/search?q=e"],
    ["-pcp", "https://pcpartpicker.com"],
    ["-pcp e", "https://pcpartpicker.com/search/?q=e"],
    ["-y", "https://www.youtube.com"],
    ["-y test", "https://www.youtube.com/results?search_query=test"],
    ["", "https://www.google.com/search?q="],
    ["-", ""],
    ["--", ""],
    ["-NOTREALCOMMAND", ""],
  ]);
  queries.forEach(async (result, search) => {
    const res = await POST({
      request: {
        json: () => {
          return {
            text: search,
            engine: "Google",
          };
        },
      },
    });
    const url = await res.text();
    expect(url).toBe(result);
  });
});

test("Put", async () => {
  const queries = new Map<string, { url?: any; searchable?: any }>([
    [
      "-test1",
      {
        url: "https://test.com",
        searchable: false,
      },
    ],
    [
      "test2",
      {
        url: "https://test.com",
        searchable: false,
      },
    ],
    [
      "-test3",
      {
        url: 5,
        searchable: false,
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
        searchable: true,
      },
    ],
  ]);
  const results = new Map<string, string>([
    ["-test1", `PUT - Added: -test1: ${JSON.stringify(queries.get("-test1"))}`],
    ["test2", `PUT - test2 was not added`],
    ["-test3", `PUT - -test3 was not added`],
    ["-test4", `PUT - -test4 was not added`],
    ["-test5", `PUT - -test5 was not added`],
    ["-test6", `PUT - -test6 was not added`],
    ["-test7", `PUT - -test7 was not added`],
  ]);
  queries.forEach(async (value, key) => {
    const res = await PUT({
      request: {
        headers: {
          get: () => {
            return _API_KEY;
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
  ]);
  queries.forEach(async (result, search) => {
    const res = await DELETE({
      request: {
        headers: {
          get: () => {
            return _API_KEY;
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
