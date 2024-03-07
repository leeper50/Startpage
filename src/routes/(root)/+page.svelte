<script lang="ts">
  import type { PageData } from "./$types";
  export let data: PageData;
  let { user } = data;
  let pageData = data.page;
  import Linkbox from "$lib/components/Linkbox.svelte";
  import Rss from "$lib/components/Rss.svelte";
  import Searchbar from "$lib/components/Searchbar.svelte";
</script>

{#if !user || user.fancy === false}
  <div
    class="flex bg-surface-500 h-full overflow-auto justify-center md:items-center font-bold"
  >
    <div class="flex flex-col container text-2xl gap-4">
      <div
        class="flex flex-wrap gap-4 border-4 border-surface-400 items-center p-2"
      >
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
      <div class="flex flex-wrap w-full text-2xl text-gray-300 gap-2">
        {#if user && user.rssVisibility}
          <div
            class="flex flex-col grow gap-4 overflow-hidden"
            style="flex-basis: {(1 / Math.max(pageData.length - 1, 2)) * 100}%"
          >
            {#if data.valid}
              <Rss minimal={true} data={data.items} />
            {:else}
              <p>
                Problem with rss config!
                <br />Check your url and key.
              </p>
            {/if}
          </div>
        {/if}
        <Linkbox minimal={true} linkList={pageData} />
      </div>
      <!-- <div class="flex flex-wrap gap-4">
        <Linkbox linkList={pageData} />
      </div> -->
    </div>
  </div>
{:else}
  <div
    class="flex w-full h-full justify-center bg-[url('/background.webp')] bg-center bg-cover overflow-auto"
    class:background-img={user.backgroundVisibility}
    style="background-color: {user.backgroundColor}"
  >
    <div class="flex flex-col container xl:self-center">
      <div class="w-full flex self-start text-4xl text-gray-400">
        <Searchbar placeholder="Search..." />
      </div>
      <div class="flex flex-wrap w-full text-2xl text-gray-300 gap-2">
        {#if user.rssVisibility}
          <div
            class="flex flex-col max-w-3xl grow gap-4 overflow-hidden"
            style="flex-basis: {(1 / Math.max(pageData.length - 1, 2)) * 100}%"
          >
            {#if data.valid}
              <Rss minimal={false} data={data.items} />
            {:else}
              <p>
                Problem with rss config!
                <br />Check your url and key.
              </p>
            {/if}
          </div>
        {/if}
        <Linkbox minimal={false} linkList={pageData} />
      </div>
    </div>
  </div>
{/if}
