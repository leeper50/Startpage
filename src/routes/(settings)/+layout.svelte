<script lang="ts">
  import { AppShell, Avatar, TabGroup, TabAnchor, Modal } from "@skeletonlabs/skeleton";
  import type { PageData } from "./$types";
  export let data: PageData;
  let { user } = data;
</script>

<Modal />
<AppShell>
  <svelte:fragment slot="header">
    <div class="flex justify-between items-center px-2 bg-surface-500 font-bold text-xl">
      <a class="text-4xl" href="/">Home</a>
      <TabGroup>
        <TabAnchor href="/settings">
          <span>Settings</span>
        </TabAnchor>
        <TabAnchor href="/search">
          <span>Search</span>
        </TabAnchor>
        {#if user && user.isAdmin}
        <TabAnchor href="/admin">
          <span>Admin</span>
        </TabAnchor>
        {/if}
      </TabGroup>
      {#if user}
      <a class="" href="/user">
        <Avatar
          initials={user.name.slice(0, 2)}
          background="bg-surface-400"
        /></a>
      {/if}
    </div>
  </svelte:fragment>
  <slot />
</AppShell>
