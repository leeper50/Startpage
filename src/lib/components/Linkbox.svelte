<script lang="ts">
  export let minimal = true;
  export let linkList: [
    {
      title: string;
      list: [
        {
          url: string;
          id: string;
        },
      ];
    },
  ];
  let badImages = [
    "Gitea",
    "Gmail",
    "Handshake",
    "Homepage",
    "Paste",
    "Rss",
    "Tailscale",
    "Tutanota",
  ];
  function get_image(url: string, id: string) {
    if (url.startsWith("/")) return `favicon-32.png`;
    if (badImages.includes(id)) return `/icons/${id}.png`;
    else return `/images/${url.slice(8, url.indexOf("/", 9))}`;
  }
</script>

{#if minimal}
  {#each linkList as { title, list }}
    <div class="border-4 border-surface-400 p-2 grow">
      <div class="flex">
        <span class="text-error-500 pr-2">~</span>
        <span class="text-primary-500 pr-2">$</span>
        <span class="text-surface-300 p-0">~/</span>
        <span class="text-success-500 p-0">{title}</span>
      </div>
      <div class="flex flex-col">
        {#each list as { url, id }}
          <a href={url} class="text-primary-400 hover:text-error-500"
            >{id.toLowerCase()}</a
          >
        {/each}
      </div>
    </div>
  {/each}
{:else}
  {#each linkList as { title, list }}
    <div class="flex flex-col gap-4 grow">
      <div class="uppercase tracking-wider">{title}</div>
      {#each list as { url, id }}
        <a href={url} class="flex gap-1 hover:text-gray-400">
          <img
            class="w-8 h-8 grayscale-[60%] rounded"
            alt="{id} icon"
            src={get_image(url, id)}
          />
          {id}
        </a>
      {/each}
    </div>
  {/each}
{/if}
