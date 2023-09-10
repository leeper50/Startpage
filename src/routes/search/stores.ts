import { writable } from "svelte/store";
import { browser } from "$app/environment";

const stored = localStorage.getItem("key");
export const api_key = writable((browser && stored) || "api key");

api_key.subscribe((v) => {
  if (browser) return localStorage.setItem("key", v.toString());
});
