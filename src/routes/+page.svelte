<script lang="ts">
  import Links from "$lib/Links.svelte";
  import Searchbar from "$lib/Searchbar.svelte";
</script>

<main>
  <div class="container">
    <Searchbar />
    <Links />
  </div>
</main>

<style lang="scss">
  main {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #222;
  }
  .container {
    display: flex;
    flex-direction: column;
    font-family: Arial, monospace;
    font-size: 1.5rem;
    font-weight: bold;
    width: 75%;
    gap: 4px;
  }
</style>
