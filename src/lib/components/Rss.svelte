<script lang="ts">
  export let data = [{ title: "", url: "", site: "" }];
</script>

<p>NEWS</p>
{#each data as { title, url, site }}
  <a href={url} class="h-8 inline-block overflow-hidden whitespace-nowrap text-ellipsis hover:text-gray-400" {title}>
    <img
      alt=""
      class="w-8 h-8 inline-block align-top grayscale-[60%] rounded"
      src={`/images/${site.slice(8, site.indexOf("/", 9))}`}
    />
    {title}
  </a>
{/each}
