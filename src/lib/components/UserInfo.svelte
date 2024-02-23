<script lang="ts">
  import type { User } from "@prisma/client";
  export let user: User;
</script>

<div class="text-primary-500 font-bold text-2xl flex flex-col items-center">
  <h1 class="text-4xl py-4 text-primary-400">User Info</h1>
  <div class="flex flex-wrap gap-8 border-4 border-surface-400 p-2">
    <ul class="list-none border-4 border-surface-400 p-2 text-wrap break-words">
      <h2 class="text-primary-400">Style</h2>
      <li>Name: <span class="text-error-500">{user.name}</span></li>
      <li>Fancy Layout: <span class="text-error-500">{user.fancy}</span></li>
    </ul>
    <ul class="list-none border-4 border-surface-400 p-2">
      <h2 class="text-primary-400">RSS</h2>
      <li>Using RSS: <span class="text-error-500">{user.rssVisibility}</span></li>
      <li>RSS Site: <span class="text-error-500">{user.rssUrl}</span></li>
      <li>RSS Key: <span class="text-error-500">{user.rssApiKey}</span></li>
    </ul>
    <ul class="list-none border-4 border-surface-400 p-2">
      <h2 class="text-primary-400">Background</h2>
      <li>Using Background: <span class="text-error-500">{user.backgroundVisibility}</span></li>
      <li>Background Image: <span class="text-error-500">{user.backgroundUrl}</span></li>
      <li>Default Background Color: <span class="text-error-500">{user.backgroundColor}</span></li>
    </ul>
  </div>
</div>
