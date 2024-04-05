<script lang="ts">
  export let placeholder = "";
  let search = "";
  function submitHandler() {
    fetch(`/api/v1/searches/${encodeURIComponent(search)}`, {
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

<form on:submit|preventDefault={submitHandler} class="flex gap-3 w-full m-0">
  <!-- svelte-ignore a11y-autofocus -->
  <input
    type="text"
    autofocus={true}
    autocapitalize="off"
    autocorrect="off"
    spellcheck="false"
    class="placeholder:text-gray-400 bg-transparent outline-none w-full"
    bind:value={search}
    {placeholder}
  />
</form>
