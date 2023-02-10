<script lang="ts">
  async function fetchData() {
    const res = await fetch("/api/search");
    const data = await res.json();

    type Command = { id: string; param: { url: string; searchable: string } };
    let temp: Command[] = [];

    Object.keys(data).forEach((item) => {
      temp.push({
        id: item,
        param: {
          url: data[item].url,
          searchable: data[item].searchable,
        },
      });
    });
    return temp;
  }
</script>

<h2>Commands</h2>
{#await fetchData() then data}
  <ul>
    {#each data as { id, param }}
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
{/await}

<style lang="scss">
  h2 {
    font-family: Arial, Helvetica, sans-serif;
    text-align: center;
  }
  ul {
    list-style-type: none;
    padding: 12px;
    gap: 12px;
  }
  li {
    margin: 10px 0;
  }
</style>
