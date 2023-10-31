<script lang="ts">
  import "@fontsource/fira-sans/400.css";
  import Radio from "$lib/components/Radio.svelte";
  import { api_key } from "./stores";
  const options = ["Post", "Put", "Delete"];
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
  <content>
    <header class="blue border">
      <Radio
        {options}
        legend="Select an operation"
        fontSize={36}
        bind:userSelected={method}
      />
      <button on:click={submitHandler} class="blue border">Submit</button>
    </header>
    <form class="blue border">
      {#if method !== "Delete"}
        <p>{method}</p>
        <label for="url">Ident: </label>
        <input type="text" bind:value={ident} class="border" />
        <label for="ident">Url: </label>
        <input type="text" bind:value={url} class="border" />
        <label for="searchable">Searchable: </label>
        <label class="switch" style="top: 4px">
          <input type="checkbox" on:click={toggleSearchable} checked />
          <span class="slider" />
        </label>
      {:else}
        <p>Delete</p>
        <label for="url">Ident: </label>
        <input type="text" bind:value={ident} class="border" />
      {/if}
      <div style="margin: 12px 12px 0px 12px;">
        <label for="api_key">Api key</label>
        <input type="password" bind:value={$api_key} class="border" />
      </div>
    </form>
    <div class="blue border response">
      {response}
    </div>
  </content>
</body>

<style lang="scss">
  body {
    width: 100%;
    height: 100%;
    background-color: #222;
    font-family: "Fira Sans";
  }
  content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1em;
    font-size: 36px;
  }
  header {
    margin-top: 0.5em;
    display: flex;
    gap: 4em;
    align-items: end;
    padding: 4px;
  }
  form {
    gap: 12px;
    text-align: center;
    padding: 4px;
    height: fit-content;
    max-width: fit-content;
    margin: auto;
    margin-bottom: 1em;
  }
  p {
    margin: 0;
  }
  input {
    color: cyan;
    background-color: #222;
    font-size: inherit;
    height: fit-content;
  }
  button {
    padding: 8px;
    font-size: 1em;
    height: fit-content;
    background-color: #222;
    cursor: pointer;
  }
  .response {
    min-width: 75%;
    min-height: 4em;
    display: flex;
    justify-content: center;
    align-items: center;
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
