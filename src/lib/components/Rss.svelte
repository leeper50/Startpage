<script lang="ts">
  export let data = [{ title: "", url: "" }];
</script>

<p>News</p>
{#each data as { title, url }}
  <a href={url} {title}>
    <img
      alt=""
      src={`https://www.google.com/s2/favicons?sz=32&domain=${url}`}
    />
    {title}
  </a>
{/each}

<style lang="scss">
  p {
    color: #939391;
    letter-spacing: 5px;
    text-transform: uppercase;
  }
  a {
    color: inherit;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    text-decoration: none;
    &:hover {
      color: #939391;
    }
  }
  img {
    filter: grayscale(60%);
    max-height: 32px;
    max-width: 32px;
    border-radius: 4px;
    vertical-align: middle;
  }
</style>
