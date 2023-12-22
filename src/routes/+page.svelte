<script lang="ts">
  // MAIN
  import "@fontsource/fira-sans/200.css";
  import "@fontsource/fira-sans/600.css";
  import Searchbar from "$lib/components/Searchbar.svelte";
  import { style } from "$lib/stores";
  // FANCY
  import Rss from "$lib/components/Rss.svelte";
  import type { PageData } from "./$types";
  export let data: PageData;
  let badImages = ["Gitea", "Gmail", "Handshake", "Homepage", "Paste", "Rss"];
  function get_image(url: string, id: string) {
    if (url.startsWith("/")) return `favicon-32.png`;
    if (badImages.includes(id)) return `/icons/${id}.png`;
    else return `/images/${url.slice(8, url.indexOf("/", 9))}`;
  }
  // MINIMAL
  import linkData from "/src/minimal_links.yml";
</script>

{#if $style === "Minimal"}
  <div class="minimal-body">
    <main>
      <div class="settings">
        <a href="/settings">⚙️</a>
      </div>
      <div class="minimal-bar border">
        <div>
          <span class="blue">user</span>
          <span class="gray">@</span>
          <span class="blue">internet</span>
          <span class="magenta">~</span>
          <span class="blue">$</span>
        </div>
        <!-- svelte-ignore a11y-autofocus -->
        <div class="border blue">
          <Searchbar />
        </div>
      </div>
      <div class="container">
        {#each linkData as { title, list }}
          <div class="box border">
            <div style="display: flex">
              <span class="magenta space">~</span>
              <span class="blue space">$</span>
              <span class="orange space">cd</span>
              <span class="gray">~/</span>
              <span class="green">{title}</span>
            </div>
            <div class="content">
              {#each list as { url, id }}
                <a href={url} class="cyan">{id.toLowerCase()}</a>
              {/each}
            </div>
          </div>
        {/each}
      </div>
    </main>
  </div>
{:else}
  <div class="fancy-body background-img">
    <div class="settings">
      <a href="/settings">⚙️</a>
    </div>
    <div class="content">
      <span class="moody-gray">
        <Searchbar placeholder="Search..." />
      </span>
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
  </div>
{/if}

<style lang="scss">
  @media (max-width: 824px) {
    .fancy-body {
      position: absolute;
      height: auto !important;
    }
  }
  .background-img {
    background-color: #081118;
    background-image: url("/background.webp");
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }
  .fancy-body {
    width: 100%;
    height: 100%;
    font-family: "Fira Sans";
    font-size: 24px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #d4d4d3;
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
    p {
      color: #939391;
      letter-spacing: 5px;
      text-transform: uppercase;
    }
    .moody-gray {
      font-size: 1.5em;
      color: #939391;
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
  }
  .minimal-body {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    .settings {
      position: absolute;
      font-size: 1.5em;
      top: 12px;
      right: 12px;
    }
    main {
      display: flex;
      flex-direction: column;
      font-family: Arial, monospace;
      width: 75%;
      gap: 4px;
      margin: 12px;
    }
    .minimal-bar {
      font-size: 1.5em;
      font-weight: bold;
      padding: 8px;
      display: flex;
      gap: 12px;
      margin: 0px;
      align-items: center;
      :nth-child(1) {
        display: flex;
      }
      :nth-child(2) {
        width: 100%;
      }
    }
    .container {
      display: flex;
      flex-flow: wrap;
      font-size: 1.5rem;
      font-weight: bold;
      gap: 4px;
      text-align: left;
      width: 100%;
    }
    .box {
      padding: 8px;
      flex: 1 1 200px;
    }
    .space {
      margin-right: 6px;
    }
    .content {
      display: flex;
      flex-direction: column;
      a {
        display: block;
        padding-top: 4px;
        &:hover {
          color: #dc322f;
        }
      }
    }
    a {
      text-decoration: none;
    }
  }
</style>
