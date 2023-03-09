<script lang="ts">
  import { onMount } from "svelte";
  import { data } from "$lib/linkData";
  import background from "$lib/images/background.webp";
  import magnify from "$lib/images/magnify.webp";
  import signal from "$lib/images/signal.webp";
  let badImages = ["Handshake", "Files", "Heimdall"];
  let ip = "",
    search = "";
  onMount(async () => {
    ip = await (await fetch("https://icanhazip.com")).text();
    let res = await (await fetch(`https://ipapi.co/${ip}/json`)).json();
    ip = ip + ` ${res.city}`;
  });
  function submitHandler() {
    fetch("/api/search", {
      method: "POST",
      body: JSON.stringify({
        text: search,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.text())
      .then((text) => {
        if (text !== "") document.location.href = text;
        else alert("Command not valid!");
      });
  }
</script>

<div class="content" style="background-image: url('{background}')">
  <main>
    <form on:submit|preventDefault={submitHandler}>
      <img src={magnify} alt="Magnifying Glass" />
      <!-- svelte-ignore a11y-autofocus -->
      <input
        type="text"
        autofocus={true}
        autocapitalize="off"
        autocorrect="off"
        spellcheck="false"
        bind:value={search}
        placeholder="Search"
      />
    </form>
    <div id="links">
      {#each data as { id, list }}
        <div id="link-box">
          <p>{id}</p>
          {#each list as { url, ident }}
            <span style="display: flex;">
              <a href={url}>
                {#if badImages.includes(ident)}
                  <img alt="{ident} icon" src={`/icons/${ident}.ico`} />
                {:else}
                  <img
                    alt=""
                    src={"http://www.google.com/s2/favicons?sz=32&domain=" +
                      url}
                  />{/if}
                {ident}
              </a>
            </span>
          {/each}
        </div>
      {/each}
    </div>
  </main>
  <footer>
    <img src={signal} alt="Signal icon" />
    {ip}
  </footer>
</div>

<style lang="scss">
  @media (min-width: 768px) and (min-aspect-ratio: 1) {
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
    margin-top: auto;
    gap: 0px;
  }
  form {
    display: flex;
    gap: 12px;
    margin: 0;
    img {
      filter: invert(85%);
      height: 32px;
    }
    input[type="text"] {
      background-color: transparent;
      border: none;
      outline: none;
      color: #939391;
      font-family: inherit;
      font-size: 24px;
      width: 25%;
      &::placeholder {
        font-weight: 600;
      }
    }
  }
  #links {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 20px 200px;
    font-weight: 600;
  }
  #link-box {
    display: flex;
    flex-direction: column;
    gap: 20px;
    font-weight: 300;
  }
  footer {
    width: 100%;
    display: flex;
    margin-top: auto;
    gap: 8px;
    min-height: 34px;
    img {
      filter: invert(80%);
    }
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
      height: 32px;
      border-radius: 4px;
    }
  }
  p {
    color: #939391;
    letter-spacing: 5px;
    text-transform: uppercase;
  }
</style>
