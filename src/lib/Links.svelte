<script lang="ts">
  import {data} from './Websites'
</script>

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
          <a href={url} class="cyan">{ident}</a>
        {/each}
      </div>
    </div>
  {/each}
</div>

<style lang="scss">
  .container {
    display: flex;
    flex-flow: wrap;
    font-family: Arial, monospace;
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
</style>
