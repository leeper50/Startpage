<script lang="ts">
  import { commands } from "../stores";
  let data = Object.entries($commands);
</script>

<main class="magenta">
  <h2>Commands</h2>
  <ul>
    {#each data as [id, param]}
      <li>
        {id}
        <span> &rightarrow;</span>
        {#if param.searchable}
          {param.url} <br />
          <span class="tab">Searachble: True</span>
        {:else}
          {param.url} <br />
          <span class="tab">Searachble: False</span>
        {/if}
      </li>
    {/each}
  </ul>
</main>

<style lang="scss">
  main {
    height: 98vh;
    border: 4px solid #444;
    border-radius: 4px 0 0 4px;
    background-color: rgba(22, 22, 22, 0.25);
    width: fit-content;
    font-family: Arial;
  }
  h2 {
    text-align: center;
  }
  .tab {
    padding-left: 12px;
  }
</style>
