<script lang="ts">
  import CommandList from "$lib/CommandList.svelte";
  import Links from "$lib/Links.svelte";
  import Searchbar from "$lib/Searchbar.svelte";
  import { fade } from "svelte/transition";
  let visible = false;
</script>

<body>
  <header>
    <button on:click={() => (visible = !visible)}>
      <div class="border" />
      <div class="border" />
      <div class="border" />
    </button>
  </header>
  <main>
    <Searchbar />
    <Links />
  </main>
  {#if visible}
    <div id="sidebar" transition:fade={{ duration: 250 }}>
      <CommandList />
    </div>
  {/if}
</body>

<style lang="scss">
  #sidebar {
    position: absolute;
    right: 8px;
  }
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
    font-size: 1.5rem;
    font-weight: bold;
    width: 75%;
    gap: 4px;
    margin: 12px;
  }
  header {
    position: absolute;
    top: 0px;
    width: 100%;
  }
  button {
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
  }
  .border {
    width: 24px;
    border: 2px solid #888;
    border-radius: 4px;
  }
</style>
