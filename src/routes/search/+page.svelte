<script lang="ts">
  import CommandList from "$lib/CommandList.svelte";

  let ident: string = "";
  let url: string = "";
  let searchable: boolean = true;
  let isPut: boolean = true;
  let refresh = {};
  let api_key = "";

  function submitHandler() {
    let body = {};
    if (isPut) body[ident] = { url: url, searchable: searchable };
    else body = { id: [ident] };
    const method = isPut ? "PUT" : "DELETE";
    fetch("/api/search", {
      method: method,
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        api_key: api_key,
      },
    });
    refresh = {};
  }
  const toggleSearchable = () => (searchable = !searchable);
  const toggleHttpVerb = () => {
    ident = "";
    url = "";
    searchable = true;
    isPut = !isPut;
  }
</script>

<html lang="en">
  <header>
    <button on:click={toggleHttpVerb} class="blue border">Put or Delete</button>
    <button on:click={submitHandler} class="blue border">Submit</button>
  </header>
  <body>
    <form id="submit" class="blue border">
      {#if isPut}
        <p>Put</p>
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
        <label for="api_key">Api key pls</label>
        <input type="password" bind:value={api_key} class="border" />
      </div>
    </form>
    <div class="magenta commands">
      {#key refresh}
        <CommandList />
      {/key}
    </div>
  </body>
</html>

<style lang="scss">
  html {
    background-color: #222;
    font-family: "Fira Sans";
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    font-size: 1.5em;
    margin-top: 12px;
  }
  body {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  #submit {
    height: fit-content;
    gap: 12px;
    text-align: center;
    padding: 4px;
    max-width: fit-content;
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
  }
  .commands {
    font-size: 0.5em;
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
