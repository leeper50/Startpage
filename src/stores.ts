import { writable } from "svelte/store";

export const commands = writable({
  "-4": {
    "url": "https://boards.4channel.org/",
    "searchable": true
  },
  "-g": {
    "url": "https://www.google.com/search?q=",
    "searchable": true
  },
  "-r": {
    "url": "https://www.reddit.com/r/",
    "searchable": true
  },
  "-t": {
    "url": "https://lt.dellhplaptop.xyz/?source=auto&target=en&q=",
    "searchable": true
  },
  "-w": {
    "url": "https://www.wolframalpha.com/input/?i=",
    "searchable": true
  },
  "-y": {
    "url": "https://www.youtube.com/results?search_query=",
    "searchable": true
  },
  "-pcp": {
    "url": "https://pcpartpicker.com/",
    "searchable": false
  }
});
