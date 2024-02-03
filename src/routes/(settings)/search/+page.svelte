<script lang="ts">
  import type { PageData } from "./$types";
  export let data: PageData;
  let { user } = data;
  import { RadioGroup, RadioItem, SlideToggle } from "@skeletonlabs/skeleton";
  // NEW SEARCH THINGS
  let method = "Post";
  let ident: string = "";
  let url: string = "";
  let searchable: boolean = true;
  let response = "";
  function submitHandler() {
    let body = {};
    if (method !== "Delete") body[ident] = { url: url, searchable: searchable };
    else body = { id: ident };
    if (ident !== "")
      fetch("/api/search", {
        method: method,
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
          api_key: user.api_key,
        },
      })
        .then((res) => res.text())
        .then((text) => (response = text));
  }
</script>

<main class="flex flex-col h-full text-primary-500 bg-surface-500 text-xl font-bold">
  <div class="flex flex-col border-4 border-surface-400 self-center w-96 mb-4 p-2">
    <content>
      <h1 class="text-2xl">Select a search operation</h1>
      <header class="pb-4">
        <RadioGroup rounded="" display="flex">
          <RadioItem bind:group={method} name="Method" value={"Post"}>Post</RadioItem>
          <RadioItem bind:group={method} name="Method" value={"Put"}>Put</RadioItem>
          <RadioItem bind:group={method} name="Method" value={"Delete"}>Delete</RadioItem>
        </RadioGroup>
      </header>
      <form class="flex flex-col h-36">
        {#if method !== "Delete"}
          <div class="flex gap-2 justify-between pb-2">
            <label for="url">Ident: </label>
            <input type="text" bind:value={ident} class="border-4 border-surface-400 bg-transparent" />
          </div>
          <div class="flex gap-2 justify-between pb-2">
            <label for="ident">Url:</label>
            <input type="text" bind:value={url} class="border-4 border-surface-400 bg-transparent" />
          </div>
          <div class="flex gap-2 justify-between">
            <label for="searchable">Searchable:</label>
            <SlideToggle name="searchable" bind:checked={searchable}/>
          </div>
        {:else}
          <div class="flex gap-2 justify-between pb-2">
            <label for="ident">Ident:</label>
            <input type="text" bind:value={ident} class="border-4 border-surface-400 bg-transparent" />
          </div>
        {/if}
      </form>
    </content>
    <button on:click={submitHandler} class="p-1 w-fit self-end border-4 border-surface-400">Submit</button>
  </div>
  <div class="border-4 border-surface-400 text-error-500 self-center w-96 min-h-16 p-2">
    <code class="break-all">
      {response}
    </code>
  </div>
</main>
