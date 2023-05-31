<script lang="ts">
  import linkData from "$lib/links.yml";
  import "@fontsource/fira-sans/200.css";
  import background from "$lib/images/background.webp";
  import Searchbar from "$lib/components/Searchbar.svelte";
  import Rss from "$lib/components/Rss.svelte";
  import type { PageData } from "./$types";
  export let data: PageData;
  let badImages = [
    "Handshake",
    "Files",
    "Heimdall",
    "Linkedin",
    "Paste",
    "Rss",
    "Send",
  ];
  function get_image(url: string, id: string) {
    if (badImages.includes(id)) return `/icons/${id}.png`;
    else return `https://www.google.com/s2/favicons?sz=32&domain=${url}`;
  }
</script>

<div class="content" style="background-image: url('{background}')">
  <main>
    <Searchbar />
    <div id="links">
      {#if data.valid}
        <div class="link-box rss">
          <Rss data={data.items} />
        </div>
      {/if}
      {#each linkData as { title, list }}
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
  </main>
</div>

<style lang="scss">
  @media (min-width: 1003px) {
    .content {
      height: 100%;
    }
  }
  .content {
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    font-family: "Fira Sans";
    font-size: 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #d4d4d3;
  }
  main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 0px;
    width: 75%;
  }
  #links {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 0px 32px;
    font-weight: 600;
  }
  .link-box {
    display: flex;
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
