<script lang="ts">
  let search: string = "";
  async function keypress(e: KeyboardEvent) {
    if (e.key === "Enter") {
      let res = await fetch("/api/search", {
        method: "POST",
        body: JSON.stringify({
          text: search,
        }),
      });
      res.text().then((temp) => {
        if (temp !== "") document.location.href = temp;
        else alert("Command not valid");
      });
    }
  }
</script>

<div class="container border">
  <div style="display: flex">
    <span class="blue">user</span>
    <span class="gray">@</span>
    <span class="blue">internet</span>
    <span class="magenta">~</span>
    <span class="blue">$</span>
  </div>
  <!-- svelte-ignore a11y-autofocus -->
  <div style="width: 100%">
    <input
      class="blue"
      autofocus={true}
      autocapitalize="off"
      autocomplete="off"
      autocorrect="off"
      spellcheck="false"
      bind:value={search}
      on:keypress={keypress}
    />
  </div>
</div>

<style lang="scss">
  .container {
    font-family: Arial, monospace;
    font-size: 1.5rem;
    font-weight: bold;
    padding: 8px;
    display: flex;
    gap: 12px;
  }
  input {
    background: none;
    border: none;
    font-size: inherit;
    font-weight: inherit;
    width: 100%;
    &:hover,
    &:focus {
      outline-color: #444;
      outline-style: solid;
      outline-width: 1px;
      border-radius: 2px;
    }
  }
</style>
