<script lang="ts">
  import "@fontsource/fira-sans/600.css";
  import CommandList from "$lib/components/CommandList.svelte";
  import { fade } from "svelte/transition";
  import { engine } from "$lib/stores";
  import { data } from "$lib/linkData";
  let visible = false;
  let search: string = "";
  const searchEngines = ["Brave", "Duck", "Google", "Searx"];
  const submitHandler = () => {
    fetch("/api/search", {
      method: "POST",
      body: JSON.stringify({
        text: search,
        engine: $engine,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.text())
      .then((res) => {
        if (res !== "") document.location.href = res;
        else alert("Command not valid!");
      });
  };
</script>

<body>
  <header>
    <button id="nav-button" on:click={() => (visible = !visible)}>
      <div />
      <div />
      <div />
    </button>
  </header>
  {#if visible}
    <div id="sidebar" class="magenta" transition:fade={{ duration: 250 }}>
      <CommandList />
    </div>
  {/if}
  <main>
    <!-- SearchBox -->
    <form class="border" on:submit|preventDefault={submitHandler}>
      <div>
        <span class="blue">user</span>
        <span class="gray">@</span>
        <span class="blue">internet</span>
        <span class="magenta">~</span>
        <span class="blue">$</span>
      </div>
      <!-- svelte-ignore a11y-autofocus -->
      <input
        class="blue"
        autofocus={true}
        autocapitalize="off"
        autocomplete="off"
        autocorrect="off"
        spellcheck="false"
        bind:value={search}
      />
      <select bind:value={$engine} class="blue border">
        {#each searchEngines as engine}
          <option value={engine}>{engine}</option>
        {/each}
      </select>
    </form>
    <!-- LinkBox -->
    <div class="container">
      {#each data as { id, list }}
        <div class="box border">
          <div style="display: flex">
            <span class="magenta space">~</span>
            <span class="blue space">$</span>
            <span class="orange space">cd</span>
            <span class="gray">~/</span>
            <span class="green">{id}</span>
          </div>
          <div class="content">
            {#each list as { url, ident }}
              <a href={url} class="cyan">{ident.toLowerCase()}</a>
            {/each}
          </div>
        </div>
      {/each}
    </div>
  </main>
</body>

<style lang="scss">
  // ------------ HTML ------------
  body {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #222;
  }
  main {
    display: flex;
    flex-direction: column;
    font-family: Arial, monospace;
    width: 75%;
    gap: 4px;
    margin: 12px;
  }
  header {
    position: absolute;
    top: 0px;
    width: 100%;
  }
  // ------------ SearchBox ------------
  form {
    font-size: 1.5rem;
    font-weight: bold;
    padding: 8px;
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin: 0px;
    div {
      display: flex;
    }
  }
  input {
    background: none;
    border: none;
    font-size: inherit;
    font-weight: inherit;
    min-width: 200px;
    flex-grow: 1;
    &:hover,
    &:focus {
      outline-color: #444;
      outline-style: solid;
      outline-width: 1px;
      border-radius: 2px;
    }
  }
  select {
    background-color: inherit;
    font-family: inherit;
    font-size: 1rem;
  }
  // ------------ LinkBox ------------
  .container {
    display: flex;
    flex-flow: wrap;
    font-size: 1.5rem;
    font-weight: bold;
    gap: 4px;
    text-align: left;
    width: 100%;
  }
  .box {
    padding: 8px;
    flex: 1 1 200px;
  }
  .space {
    margin-right: 6px;
  }
  .content {
    display: flex;
    flex-direction: column;
  }
  a {
    display: block;
    padding-top: 4px;
    text-decoration: none;
    &:hover {
      color: #dc322f;
    }
  }
  // ------------ NavButton ------------
  #nav-button {
    padding: 0;
    margin: 12px;
    background-color: inherit;
    border: 0;
    display: flex;
    flex-direction: column;
    gap: 4px;
    &:hover {
      cursor: pointer;
    }
    div {
      width: 24px;
      border: 2px solid #888;
      border-radius: 4px;
    }
  }
  #sidebar {
    position: absolute;
    right: 0.5em;
    top: 0.5em;
    border: 4px solid #444;
    border-radius: 4px;
    background-color: rgba(22, 22, 22, 0.95);
    font-family: "Fira Sans";
    font-weight: 400;
    width: fit-content;
  }
  @media (max-aspect-ratio: 1/1) {
    #sidebar {
      top: 30%;
      height: auto;
      right: auto;
    }
  }
</style>
