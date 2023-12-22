<script lang="ts">
  import "@fontsource/fira-sans/600.css";
  import linkData from "./links.yml";
  let search: string = "";
  const submitHandler = () => {
    fetch(`/api/search/${search}`, {
      method: "GET",
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
  <main>
    <div class="settings">
      <a href="/settings">⚙️</a>
    </div>
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
    </form>
    <div class="container">
      {#each linkData as { title, list }}
        <div class="box border">
          <div style="display: flex">
            <span class="magenta space">~</span>
            <span class="blue space">$</span>
            <span class="orange space">cd</span>
            <span class="gray">~/</span>
            <span class="green">{title}</span>
          </div>
          <div class="content">
            {#each list as { url, id }}
              <a href={url} class="cyan">{id.toLowerCase()}</a>
            {/each}
          </div>
        </div>
      {/each}
    </div>
  </main>
</body>

<style lang="scss">
  body {
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
  }
  .settings {
    position: absolute;
    font-size: 1.5em;
    top: 12px;
    right: 12px;
  }
  main {
    display: flex;
    flex-direction: column;
    font-family: Arial, monospace;
    width: 75%;
    gap: 4px;
    margin: 12px;
  }
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
    a {
      display: block;
      padding-top: 4px;
      &:hover {
        color: #dc322f;
      }
    }
  }
  a {
    text-decoration: none;
  }
</style>
