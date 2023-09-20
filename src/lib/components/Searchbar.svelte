<script lang="ts">
  let search = "";
  function submitHandler() {
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
    placeholder="Search..."
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
      color: #939391;
      font-family: inherit;
      font-size: 1.5em;
      width: 100%;
      &::placeholder {
        opacity: 80%;
        font-weight: 200;
      }
    }
  }
</style>
