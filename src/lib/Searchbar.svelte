<script lang="ts">
  let search: string = "";
  const submitHandler = () => {
    fetch("/api/search", {
      method: "POST",
      body: JSON.stringify({
        text: search,
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

<form class="container border" on:submit|preventDefault={submitHandler}>
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
    />
  </div>
</form>

<style lang="scss">
  .container {
    font-family: Arial, monospace;
    font-size: 1.5rem;
    font-weight: bold;
    padding: 8px;
    display: flex;
    gap: 12px;
    margin: 0px;
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
