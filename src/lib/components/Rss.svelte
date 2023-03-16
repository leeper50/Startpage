<script lang="ts">
  export let data = [{ title: "", url: "" }];
</script>

<p class="title">News</p>
{#each data as { title, url }}
  <p class="link">
    <a href={url}>
      <img
        alt=""
        src={`https://www.google.com/s2/favicons?sz=32&domain=${url}`}
      />
      {title}
    </a>
  </p>
{/each}

<style lang="scss">
  p {
    &.title {
      color: #939391;
      letter-spacing: 5px;
      text-transform: uppercase;
    }
    &.link {
      margin: 0;
      padding: 0;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      a {
        font-size: 24px;
        margin-left: 5px;
        color: inherit;
        text-transform: capitalize;
        text-decoration: none;
        gap: 8px;
        &:hover {
          color: #939391;
        }
        img {
          filter: grayscale(60%);
          max-height: 32px;
          max-width: 32px;
          border-radius: 4px;
        }
      }
    }
  }
</style>
