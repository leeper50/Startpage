<script lang="ts">
  import { AppShell, Avatar } from "@skeletonlabs/skeleton";
  import type { PageData } from "./$types";
  export let data: PageData;
  let { user } = data;
  function goToLogin() {
    location.href = "/login";
  }
</script>

<AppShell>
  <svelte:fragment slot="header">
    <div class="flex align-middle justify-between bg-surface-500 font-bold">
      <a class="text-4xl" href="/">Home</a>
      {#if user}
        <Avatar
          initials={user.email.slice(0, 2)}
          background="bg-surface-400"
          cursor="cursor-pointer"
          on:click={goToLogin}
        />
      {/if}
    </div>
  </svelte:fragment>
  <slot />
</AppShell>
