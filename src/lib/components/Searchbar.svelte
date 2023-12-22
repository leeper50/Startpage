<script lang="ts">
  export let placeholder = "";
  let search = "";
  function submitHandler() {
    fetch(`/api/search/${search}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.text())
      .then((text) => {
        if (text !== "") document.location.href = text;
        else alert("Command not valid!");
      });
  }
</script>

<form on:submit|preventDefault={submitHandler}>
  <!-- svelte-ignore a11y-autofocus -->
  <input
    type="text"
    autofocus={true}
    autocapitalize="off"
    autocorrect="off"
    spellcheck="false"
    bind:value={search}
    placeholder={placeholder}
  />
</form>

<style lang="scss">
  form {
    display: flex;
    gap: 12px;
    margin: 0;
    input[type="text"] {
      background-color: transparent;
      border: none;
      outline: none;
      color: inherit;
      font-family: inherit;
      font-size: inherit;
      font-weight: inherit;
      width: 100%;
    }
  }
</style>
