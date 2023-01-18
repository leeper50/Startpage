<script lang="ts">
  import { commands } from "../stores";
  let text: string = "";
  function keypress(e: KeyboardEvent) {
    if (e.key === "Enter") {
      let url: string = parse();
      url.replaceAll('"', "");
      if (url !== "") document.location.href = url;
      else alert("Command not valid");
    }
  }
  // Takes in possible command and returns url
  // Will alert if command is invalid
  function parse() {
    text = text.trim();

    if (text === "-") {
      return "";
    }

    // return regular search if no command provided
    if (!text.startsWith("-")) {
      return;
      "https://duckduckgo.com/?t=ffab&q=" + encodeURIComponent(text);
    }

    let keyText: string = "";
    let searchText: string = "";

    if (text.includes(" ")) {
      keyText = text.substring(0, text.indexOf(" "));
      searchText = text.substring(text.indexOf(" ") + 1);
    } else {
      keyText = text;
    }
    keyText = keyText.toLowerCase();

    if ($commands[keyText] === undefined) {
      return "";
    }
    const { url, searchable } = $commands[keyText];

    // returns url if command is not searchable
    if (searchable == false) {
      return url;
    }

    // returns cleaned url if no searchtext is provided
    if (searchText.trim() === "") {
      const searchParams = ["/r/", "/input", "/results"];
      let temp = url;
      searchParams.forEach((item) => {
        temp = temp.split(item)[0];
      });
      return temp;
    }

    // return url with search
    return url + encodeURIComponent(searchText);
  }
</script>

<div class="container border">
  <div style="display: flex">
    <span class="blue">user</span>
    <span class="gray">@</span>
    <span class="blue">internet</span>
    <span class="magenta">~</span>
    <span class="blue">$</span>
  </div>
  <!-- svelte-ignore a11y-autofocus -->
  <div style="width: 100%">
    <input
      class="blue"
      autofocus={true}
      autocapitalize="off"
      autocomplete="off"
      autocorrect="off"
      spellcheck="false"
      bind:value={text}
      on:keypress={keypress}
    />
  </div>
</div>

<style lang="scss">
  .container {
    font-family: Arial, monospace;
    font-size: 1.5rem;
    font-weight: bold;
    padding: 8px;
    display: flex;
    gap: 12px;
  }
  input {
    background: none;
    border: none;
    font-size: inherit;
    font-weight: inherit;
    width: 100%;
    &:hover,
    &:focus {
      outline-color: #444;
      outline-style: solid;
      outline-width: 1px;
      border-radius: 2px;
    }
  }
</style>
