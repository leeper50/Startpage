<script lang="ts">
  export let data = [{ title: "", url: "" }];
</script>

<p>News</p>
{#each data as { title, url }}
  <a href={url} {title}>
    <span class="image">
      <img
        alt=""
        src={`https://www.google.com/s2/favicons?sz=32&domain=${url}`}
      />
    </span>
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
    margin: 0;
    padding: 0;
    &:hover {
      color: #939391;
    }
  }
  .image {
    width: 32px;
    height: 32px;
    display: inline-block;
    vertical-align: middle;
  }
  img {
    filter: grayscale(60%);
    border-radius: 4px;
  }
</style>
