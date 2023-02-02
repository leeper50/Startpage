import { writable } from "svelte/store";
import { browser } from "$app/environment";

export const engine = writable(
  browser && (localStorage.getItem("engine") || "Searx")
);
engine.subscribe(
  (val) => browser && localStorage.setItem("engine", val as string)
);
