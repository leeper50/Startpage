<script lang="ts">
  let text: string = "";
  const search = async (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      const response = await fetch("/api/search", {
        method: "POST",
        body: JSON.stringify({ text }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      response.text().then((e) => {
        e = e.replaceAll('"', "");
        if (e !== "") document.location.href = e;
        else alert("Command not valid");
      });
    }
  };
</script>

<div class="container">
  <div class="textbox">
    <span class="blue">user</span>
    <span class="gray">@</span>
    <span class="violet">internet</span>
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
      bind:value={text}
      on:keypress={search}
    />
  </div>
</div>

<style lang="scss">
  .container {
    font-family: Arial, monospace;
    font-size: 1.5rem;
    font-weight: bold;
    border: 4px solid #444;
    padding: 8px;
    display: flex;
    gap: 12px;
  }
  .textbox {
    display: flex;
  }
  input {
    background: none;
    border: none;
    font-size: inherit;
    font-weight: inherit;
    width: 100%;
  }
</style>
