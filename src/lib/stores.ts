import { writable } from "svelte/store";
import { browser } from "$app/environment";

// Style store
const stored_style = localStorage.getItem("style");
export const style = writable((browser && stored_style) || "Fancy");
style.subscribe((v) => {
  if (browser) return localStorage.setItem("style", v.toString());
});

// User key store
const stored_key = localStorage.getItem("key");
export const api_key = writable((browser && stored_key) || "api key");
api_key.subscribe((v) => {
  if (browser) return localStorage.setItem("key", v.toString());
});

// Rss store
const stored_rss = localStorage.getItem("rss");
export const rss = writable((browser && stored_rss) || "true");
rss.subscribe((v) => {
  if (browser) return localStorage.setItem("rss", v.toString());
});