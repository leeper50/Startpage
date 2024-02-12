<script lang="ts">
  export let minimal = true;
  export let data = [{ title: "", url: "", site: "" }];
</script>

{#if !minimal}
  <p>NEWS</p>
  {#each data as { title, url, site }}
    <a
      href={url}
      class="h-8 inline-block overflow-hidden whitespace-nowrap text-ellipsis hover:text-gray-400"
      {title}
    >
      <img
        alt=""
        class="w-8 h-8 inline-block align-top grayscale-[60%] rounded"
        src={`/images/${site.slice(8, site.indexOf("/", 9))}`}
      />
      {title}
    </a>
  {/each}
{:else}
<div class="flex flex-col border-4 border-surface-400 p-2 grow">
  <div class="flex">
    <span class="text-error-500 pr-2">~</span>
    <span class="text-primary-500 pr-2">$</span>
    <span class="text-surface-300 p-0">~/</span>
    <span class="text-success-500 p-0">News</span>
  </div>
  {#each data as { title, url }}
    <a
      href={url}
      class="h-8 overflow-hidden whitespace-nowrap text-ellipsis text-primary-400 hover:text-error-500"
      {title}
    >
      {title}
    </a>
  {/each}
</div>
{/if}
