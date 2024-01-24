<script lang="ts">
  import type { PageData } from "./$types";
  export let data: PageData;
  let { user } = data;
  const default_user = {
    pageData: "",
    fancy: true,
    rssVisibility: false,
    rssUrl: "",
    rssApiKey: "",
    backgroundVisibility: true,
    backgroundUrl: "",
    backgroundColor: "#081118"
  }
  // MAIN
  import "@fontsource/fira-sans/600.css";
  import Radio from "$lib/components/Radio.svelte";
  // NEW SEARCH THINGS
  import { enhance } from "$app/forms";
  const method_options = ["Post", "Put", "Delete"];
  let method = "Post";
  let ident: string = "";
  let url: string = "";
  let searchable: boolean = true;
  let response = "";
  let files: FileList;
  async function updateUser() {
    if (files) {
      user.pageData = await files[0].text();
    }
    fetch("/settings", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  async function resetUser() {
    user = {...user, ...default_user};
    updateUser();
  }
  function submitHandler() {
    let body = {};
    if (method !== "Delete") body[ident] = { url: url, searchable: searchable };
    else body = { id: ident };
    if (ident !== "")
      fetch("/api/search", {
        method: method,
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
          api_key: user.api_key,
        },
      })
        .then((res) => res.text())
        .then((text) => (response = text));
  }
</script>

<body>
  <main class="main-font blue">
    <div class="border" style="padding: 4px;">
      <div class="settings">
        <div class="box border">
          <h1 class="blue">Homepage Style</h1>
          <p class="orange">Switch between a minimal or fancy layout</p>
          <label class="switch" for="fancy" style="top: 4px">
            <input
              id="fancy"
              name="fancy"
              type="checkbox"
              bind:checked={user.fancy}
            />
            <span class="slider" />
          </label>
          {#if user.fancy}
            <p class="orange">Toggle RSS visibility</p>
            <label class="switch" for="rssVisibility" style="top: 4px">
              <input
                id="rssVisibility"
                name="rssVisibility"
                type="checkbox"
                bind:checked={user.rssVisibility}
              />
              <span class="slider" />
            </label>
            {#if user.rssVisibility}
              <div class="input-field">
                <div>
                  <label for="url">RSS Url:</label>
                  <input type="text" bind:value={user.rssUrl} class="border" />
                </div>
                <div>
                  <label for="url">RSS Key:</label>
                  <input
                    type="password"
                    bind:value={user.rssApiKey}
                    class="border"
                  />
                </div>
              </div>
            {/if}
            <p class="orange">Toggle Background visibility</p>
            <label class="switch" for="backgroundVisibility" style="top: 4px">
              <input
                id="backgroundVisibility"
                name="backgroundVisibility"
                type="checkbox"
                bind:checked={user.backgroundVisibility}
              />
              <span class="slider" />
            </label>
            <div class="input-field">
              <!-- GET WORKING (eventually) -->
              <!-- <div>
                  <label for="url">Background Url:</label>
                  <input
                    type="text"
                    bind:value={user.backgroundUrl}
                    class="border"
                  />
                </div> -->
              {#if !user.backgroundVisibility}
                <div>
                  <label for="url">Background Color:</label>
                  <input
                    type="color"
                    bind:value={user.backgroundColor}
                    class="border"
                    style="height: 36px;"
                  />
                </div>
              {/if}
            </div>
          {/if}
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
          <div style="display:flex; justify-content: space-between;">
            <a class="blue" href="links.yml" download="links.yml">
              <button class="border">Template</button>
            </a>
            <label for="file" class="file-upload border">Upload</label>
            <input
              type="file"
              id="file"
              name="fileToUpload"
              bind:files
              accept=".yml, .yaml"
              required
            />
          </div>
        </div>
      </div>
      <div class="submit-bar">
        <button type="submit" on:click={updateUser} class="border"
          >Submit</button
        >
        <button type="submit" on:click={resetUser} class="border"
          >Reset</button
        >
        <form method="POST" action="?/logout" use:enhance>
          <button type="submit" name="logout" value="true" class="border"
            >Logout</button
          >
        </form>
      </div>
    </div>
    <div class="box border search">
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
        <form class="box blue input-field">
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
                <input type="checkbox" bind:checked={searchable} />
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
  .settings {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
    > div {
      min-width: 0;
    }
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
    background-color: inherit;
    max-width: fit-content;
    color: inherit;
    cursor: pointer;
    padding: 2 4 2 4;
  }
  input[type="file"] {
    display: none;
  }
  .submit-bar {
    display: flex;
    justify-content: center;
    gap: 2em;
    margin: 4 0 0 0;
  }
  content {
    margin-top: 0.5em;
    display: flexbox;
    flex-direction: column;
    align-items: center;
    font-size: inherit;
  }
  .input-field {
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
  .search {
    flex-grow: 0;
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
