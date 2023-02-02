<script lang="ts">
  const data = [
    {
      id: "general",
      list: [
        {
          url: "https://smile.amazon.com/",
          ident: "amazon",
        },
        {
          url: "https://dash.dellhplaptop.xyz",
          ident: "heimdall",
        },
        {
          url: "https://mastodon.world",
          ident: "mastodon",
        },
        {
          url: "https://www.twitch.tv/directory/following/",
          ident: "twitch",
        },
      ],
    },
    {
      id: "mail",
      list: [
        {
          url: "https://www.outlook.com/",
          ident: "outlook",
        },
        {
          url: "https://mail.google.com/mail/u/0/",
          ident: "gmail",
        },
        {
          url: "https://mail.tutanota.com/",
          ident: "tutanota",
        },
        {
          url: "https://mail.protonmail.com/inbox/",
          ident: "protonmail",
        },
      ],
    },
    {
      id: "reddit",
      list: [
        {
          url: "https://www.reddit.com/",
          ident: "home",
        },
        {
          url: "https://www.reddit.com/r/baseball/",
          ident: "r/baseball",
        },
        {
          url: "https://www.reddit.com/r/buildapcsales/new/",
          ident: "r/buildapcsales",
        },
        {
          url: "https://www.reddit.com/r/homelab/",
          ident: "r/homelab",
        },
        {
          url: "https://www.reddit.com/r/linux/",
          ident: "r/linux",
        },
      ],
    },
    {
      id: "work",
      list: [
        {
          url: "https://app.joinhandshake.com/",
          ident: "handshake",
        },
        {
          url: "https://www.indeed.com/",
          ident: "indeed",
        },
        {
          url: "https://www.linkedin.com/",
          ident: "linkedin",
        },
        {
          url: "https://careers.utpb.edu/",
          ident: "utpb career",
        },
      ],
    },
    {
      id: "cloud",
      list: [
        {
          url: "https://dash.cloudflare.com/",
          ident: "cloudflare",
        },
        {
          url: "./it",
          ident: "files",
        },
        {
          url: "https://github.com/",
          ident: "github",
        },
        {
          url: "https://cloud.oracle.com/",
          ident: "oracle",
        },
        {
          url: "https://login.tailscale.com/admin/machines",
          ident: "tailscale",
        },
      ],
    },
  ];
</script>

<div class="container">
  {#each data as { id, list }}
    <div class="box border">
      <div style="display: flex">
        <span class="magenta space">~</span>
        <span class="blue space">$</span>
        <span class="orange space">cd</span>
        <span class="gray">~/</span>
        <span class="green">{id}</span>
      </div>
      <div class="content">
        {#each list as { url, ident }}
          <a href={url} class="cyan">{ident}</a>
        {/each}
      </div>
    </div>
  {/each}
</div>

<style lang="scss">
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
  }
  a {
    display: block;
    padding-top: 4px;
    text-decoration: none;
    &:hover {
      color: #dc322f;
    }
  }
</style>
