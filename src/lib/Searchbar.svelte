<script lang="ts">
  import { engine } from "../stores";
  let search: string = "";

  const searchEngines = [
    {
      name: "Brave",
      url: "https://search.brave.com/search?q=",
    },
    {
      name: "Duck",
      url: "https://duckduckgo.com/?q=",
    },
    {
      name: "Google",
      url: "https://www.google.com/search?q=",
    },
    {
      name: "Searx",
      url: "https://searx.be/search?q=",
    },
  ];
  const engineMap = new Map(searchEngines.map((i) => [i.name, i.url]));
  const submitHandler = () => {
    fetch("/api/search", {
      method: "POST",
      body: JSON.stringify({
        text: search,
        engine: engineMap.get($engine as string),
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
    {#each searchEngines as { name }}
      <option value={name}>{name}</option>
    {/each}
  </select>
</form>

<style lang="scss">
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
    background-color: #222;
    font-family: inherit;
    font-size: 1rem;
  }
</style>
