<script lang="ts">
  import CommandList from "$lib/CommandList.svelte";
  import Links from "$lib/Links.svelte";
  import Searchbar from "$lib/Searchbar.svelte";
  import { fade } from "svelte/transition";
  let visible = false;
</script>

<body>
  <header>
    <button id="nav-button" on:click={() => (visible = !visible)}>
      <div />
      <div />
      <div />
    </button>
  </header>
  <main>
    <Searchbar />
    <Links />
  </main>
  {#if visible}
    <div id="sidebar" class="magenta" transition:fade={{ duration: 250 }}>
      <CommandList />
    </div>
  {/if}
</body>

<style lang="scss">
  body {
    height: 100vh;
    width: 100vw;
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
    right: 8px;
    height: 98vh;
    border: 4px solid #444;
    border-radius: 4px;
    background-color: rgba(22, 22, 22, 0.95);
    font-family: "Fira Sans";
    font-weight: 400;
    width: fit-content;
  }
</style>
