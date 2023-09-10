import { env } from "$env/dynamic/private";
import { createClient } from "redis";
import { Fallback } from "./fallback";
import type { RedisClientType } from "@redis/client";
export const _REDIS_HOST = env.redis_host ?? "redis";
export const _REDIS_PORT = env.redis_port ?? "6379";

export let client: RedisClientType | Fallback;

const starting_data = {
  "-4": {
    url: "https://boards.4channel.org/",
    searchable: "true",
  },
  "-d": {
    url: "https://hub.docker.com/search?q=",
    searchable: "true",
  },
  "-g": {
    url: "https://www.google.com/search?q=",
    searchable: "true",
  },
  "-i": {
    url: "https://icanhazip.com",
    searchable: "true",
  },
  "-l": {
    url: "https://sopuli.xyz/search?type=Communities&listingType=All&page=1&sort=TopAll&q=",
    searchable: "true",
  },
  "-pcp": {
    url: "https://pcpartpicker.com/search/?q=",
    searchable: "true",
  },
  "-q": {
    url: "https://quay.io/search?q=",
    searchable: "true",
  },
  "-r": {
    url: "https://old.reddit.com/r/",
    searchable: "true",
  },
  "-t": {
    url: "https://translate.google.com/?sl=auto&tl=en&text=",
    searchable: "true",
  },
  "-w": {
    url: "https://en.wikipedia.org/wiki/",
    searchable: "true",
  },
  "-wa": {
    url: "https://www.wolframalpha.com/input/?i=",
    searchable: "true",
  },
  "-y": {
    url: "https://www.youtube.com/results?search_query=",
    searchable: "true",
  },
};
try {
  client = createClient({
    socket: {
      host: _REDIS_HOST,
      port: parseInt(_REDIS_PORT),
    },
  });
  await client.connect();
  Object.entries(starting_data).forEach((e) => {
    client.hSet(e[0], e[1]);
  });
  console.log("Redis connection established!");  
} catch (_) {
  console.log("Could not connect to redis, using fallback");
  client = new Fallback(starting_data);
}
