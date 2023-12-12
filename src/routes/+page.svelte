<script lang="ts">
  import "@fontsource/fira-sans/200.css";
  import Searchbar from "$lib/components/Searchbar.svelte";
  import Rss from "$lib/components/Rss.svelte";
  import type { PageData } from "./$types";
  export let data: PageData;
  let badImages = ["Gitea", "Gmail", "Handshake", "Homepage", "Paste", "Rss"];
  function get_image(url: string, id: string) {
    if (url.startsWith("/")) return `favicon-32.png`;
    if (badImages.includes(id)) return `/icons/${id}.png`;
    else return `/images/${url.slice(8, url.indexOf("/", 9))}`;
  }
</script>

<body class="background-img" data-sveltekit-reload>
  <div class="settings">
    <a href="/upload">⚙️</a>
  </div>
  <div class="content">
    <Searchbar />
    <div id="links">
      {#if data.valid}
        <div class="link-box rss">
          <Rss data={data.items} />
        </div>
      {/if}
      {#each data.page as { title, list }}
        <div class="link-box">
          <p>{title}</p>
          {#each list as { url, id }}
            <span style="display: flex;">
              <a href={url}>
                <div class="image">
                  <img alt="{id} icon" src={get_image(url, id)} />
                </div>
                {id}
              </a>
            </span>
          {/each}
        </div>
      {/each}
    </div>
  </div>
</body>

<style lang="scss">
  @media (max-width: 824px) {
    body {
      height: auto !important;
    }
  }
  body {
    width: 100%;
    font-family: "Fira Sans";
    font-size: 24px;
    flex-direction: column;
    align-items: center;
    color: #d4d4d3;
  }
  .background-img {
    background-color: #081118;
    background-image: url("/background.webp");
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }
  .content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 0px;
    width: 75%;
  }
  .settings {
    position: absolute;
    top: 12px;
    right: 12px;
  }
  #links {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    text-align: left;
    font-weight: 600;
  }
  .link-box {
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: 20px;
    font-weight: 300;
  }
  .image {
    width: 32px;
    height: 32px;
    display: inline-block;
  }
  .rss {
    min-width: 128px;
    max-width: 1024px;
    flex: 4 0 0px;
  }
  a {
    margin-left: 5px;
    color: inherit;
    text-transform: capitalize;
    text-decoration: none;
    display: flex;
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
  p {
    color: #939391;
    letter-spacing: 5px;
    text-transform: uppercase;
  }
</style>
