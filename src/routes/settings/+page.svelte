<script lang="ts">
  // MAIN
  import "@fontsource/fira-sans/600.css";
  import Radio from "$lib/components/Radio.svelte";
  // STYLE
  import { style, rss } from "$lib/stores";
  const style_options = ["Fancy", "Minimal"];
  const toggleRSS = () => ($rss = String(!JSON.parse($rss)));
  // CONTENT
  import type { PageData } from "./$types";
  export let data: PageData;
  function reset_content() {
    fetch("/settings", {
      method: "Delete",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  // NEW SEARCH THINGS
  import { api_key } from "$lib/stores";
  const method_options = ["Post", "Put", "Delete"];
  let method = "Post";
  let ident: string = "";
  let url: string = "";
  let searchable: boolean = true;
  let response = "";
  function submitHandler() {
    let body = {};
    if (method !== "Delete") body[ident] = { url: url, searchable: searchable };
    else body = { id: [ident] };
    if (ident !== "")
      fetch("/api/search", {
        method: method,
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
          api_key: $api_key,
        },
      })
        .then((res) => res.text())
        .then((text) => (response = text));
  }
  const toggleSearchable = () => (searchable = !searchable);
</script>

<body>
  <main class="main-font blue">
    <div class="box border">
      <h1 class="blue">Homepage Style</h1>
      <p class="orange">Switch between a minimal or fancy layout</p>
      <Radio
        options={style_options}
        legend="Style Choices:"
        fontSize={24}
        bind:userSelected={$style}
      />
      <p>Toggle RSS visibility</p>      
      <label class="switch" style="top: 4px">
        <input type="checkbox" on:click={toggleRSS} checked={JSON.parse($rss)} />
        <span class="slider" />
      </label>
    </div>
    <div class="box border">
      <h1 class="blue">Homepage content</h1>
      <p class="orange">
        Upload a valid yaml file to customize your landing page.
      </p>
      <p class="orange">Here is an example of a valid yaml file.</p>
      <pre class="cyan">
- title: group1
  list:
    - url: https://www.example.com/
      id: Example
- title: group2
  list:
    - url: https://google.com/
      id: Foo
    - url: https://duckduckgo.com/
      id: Bar
- title: group3
  list:
    - url: https://bing.com/
      id: Foobar
      </pre>
      <div>
        <a class="blue" href="fancy_links.yml" download="links.yml">
          <button class="border">Get template</button>
        </a>
      </div>
      <form method="post" enctype="multipart/form-data">
        <div>
          <label for="file" class="file-upload border"
            >Upload file o' links</label
          >
          <input
            type="file"
            id="file"
            name="fileToUpload"
            accept=".yml, .yaml"
            required
          />
        </div>
        <span class="button-bar">
          <button type="submit" class="border">Submit</button>
          <button on:click={reset_content} type="reset" class="border"
            >Reset</button
          >
        </span>
      </form>
    </div>
    <div class="box border">
      <h1 class="blue">Search stuff</h1>
      <content>
        <header class="box blue">
          <Radio
            options={method_options}
            legend="Select an operation"
            fontSize={24}
            bind:userSelected={method}
          />
          <button on:click={submitHandler} class="blue border">Submit</button>
        </header>
        <form class="box blue search">
          {#if method !== "Delete"}
            <p>{method}</p>
            <div>
              <label for="url">Ident: </label>
              <input type="text" bind:value={ident} class="border" />
            </div>
            <div>
              <label for="ident">Url:</label>
              <input type="text" bind:value={url} class="border" />
            </div>
            <div>
              <label for="searchable">Searchable:</label>
              <label class="switch" style="top: 4px">
                <input type="checkbox" on:click={toggleSearchable} checked />
                <span class="slider" />
              </label>
            </div>
          {:else}
            <p>Delete</p>
            <div>
              <label for="url">Ident:</label>
              <input type="text" bind:value={ident} class="border" />
            </div>
          {/if}
          <div>
            <label for="api_key">Api key:</label>
            <input type="password" bind:value={$api_key} class="border" />
          </div>
        </form>
        <div class="box border response">
          <code>
            {response}
          </code>
        </div>
      </content>
    </div>
  </main>
</body>

<style lang="scss">
  main {
    display: flex;
    height: fit-content;
    flex-wrap: wrap;
    margin-top: 8px;
    gap: 12px;
    > div {
      flex: 1 0 0;
    }
  }
  h1,
  p,
  pre {
    word-wrap: normal;
    margin: 0;
  }
  .main-font {
    font-family: "Fira Sans";
    font-size: 1.25rem;
    font-weight: normal;
  }
  .box {
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 8px;
  }
  form {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    gap: 12px;
    margin: 0;
    padding: 0;
  }
  .file-upload,
  button {
    font-family: "Fira Sans";
    font-size: 1em;
    padding: 4px;
    background-color: inherit;
    min-width: fit-content;
    max-width: 64px;
    color: inherit;
    cursor: pointer;
  }
  input[type="file"] {
    display: none;
  }
  .button-bar {
    display: flex;
    justify-content: space-between;
  }
  content {
    margin-top: 0.5em;
    display: flexbox;
    flex-direction: column;
    align-items: center;
    font-size: inherit;
  }
  .search {
    gap: 12px;
    text-align: center;
    padding: 0px;
    margin: 12px 0 12px 0;
    display: flex;
    flex-direction: column;
    > div {
      text-align: left;
      display: flex;
      justify-content: space-between;
      > input {
        color: cyan;
        background-color: #222;
        font-size: inherit;
        height: fit-content;
      }
    }
  }
  .response {
    min-height: 4em;
    width: 420px;
    word-break: break-all;
  }
  /* All the slider stuff */
  .switch {
    position: relative;
    display: inline-block;
    width: 60px;
    height: 34px;
    input {
      opacity: 0;
      width: 0;
      height: 0;
    }
  }
  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    -webkit-transition: 0.4s;
    transition: 0.4s;
    border-radius: 34px;
    &:before {
      position: absolute;
      content: "";
      border-radius: 50%;
      height: 26px;
      width: 26px;
      left: 4px;
      bottom: 4px;
      background-color: white;
      -webkit-transition: 0.4s;
      transition: 0.4s;
    }
  }
  input[type="checkbox"] {
    display: flex;
    align-self: center;
    &:checked {
      + .slider {
        background-color: #2196f3;
      }
      + .slider:before {
        -webkit-transform: translateX(26px);
        -ms-transform: translateX(26px);
        transform: translateX(26px);
      }
    }
    &:focus {
      + .slider {
        box-shadow: 0 0 1px #2196f3;
      }
    }
  }
</style>
