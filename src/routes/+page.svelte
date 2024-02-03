<script lang="ts">
  import type { PageData } from "./$types";
  export let data: PageData;
  let { user } = data;
  import Searchbar from "$lib/components/Searchbar.svelte";
  // FANCY
  import Rss from "$lib/components/Rss.svelte";
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

{#if !user || user.fancy === false}
  <div class="flex bg-surface-500 h-full overflow-auto justify-center lg:items-center font-bold">
    <div class="flex flex-col container text-2xl gap-4">
      <div class="flex gap-4 border-4 border-surface-400 items-center p-2">
        <div class="flex h-min">
          <span class="text-primary-500">user</span>
          <span class="text-surface-300">@</span>
          <span class="text-primary-500">internet</span>
          <span class="text-surface-300 pl-2">~</span>
          <span class="text-primary-500 pl-2">$</span>
        </div>
        <!-- svelte-ignore a11y-autofocus -->
        <div class="flex grow border-4 border-surface-400 text-primary-500">
          <Searchbar />
        </div>
      </div>
      <div class="flex flex-wrap gap-4">
        {#each data.page as { title, list }}
          <div class="border-4 border-surface-400 p-2 grow">
            <div>
              <span class="text-error-500">~</span>
              <span class="text-primary-500">$</span>
              <span class="text-error-500">cd</span>
              <span class="text-surface-300">~/</span>
              <span class="text-success-500">{title}</span>
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
      </div>
    </div>
  </div>
{:else}
  <div
    class="flex w-full h-full justify-center bg-[url('/background.webp')] bg-center bg-cover overflow-auto"
    class:background-img={user.backgroundVisibility}
    style="background-color: {user.backgroundColor}"
  >
    <div class="flex flex-col container 2xl:self-center">
      <div class="w-full flex self-start text-4xl">
        <Searchbar placeholder="Search..." />
      </div>
      <div class="flex flex-wrap w-full text-2xl text-gray-300 gap-2">
        {#if user.rssVisibility}
          <div class="flex flex-col max-w-3xl grow gap-4 overflow-hidden">
            {#if data.valid}
              <Rss data={data.items} />
            {:else}
              <p>
                Problem with rss config!
                <br />Check your url and key.
              </p>
            {/if}
          </div>
        {/if}
        {#each data.page as { title, list }}
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
      </div>
    </div>
  </div>
{/if}
