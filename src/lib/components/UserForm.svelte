<script lang="ts">
  export let header;
  export let action;
  import { enhance } from "$app/forms";
</script>

<section class="border-4 border-surface-400 p-2">
  <h1>{header}</h1>
  <form method="post" action="?/{action}" use:enhance>
    <div class="flex justify-between gap-4 py-2">
      <label for="{action}Email" class="self-center">Email</label>
      <input
        type="email"
        name="{action}Email"
        id="{action}Email"
        class="border-4 border-surface-400 text-secondary-500 bg-transparent"
        required
      />
    </div>
    <div class="flex justify-between gap-4 py-2">
      <label for="{action}Password" class="self-center">Password</label>
      <input
        type="password"
        name="{action}Password"
        id="{action}Password"
        class="border-4 border-surface-400 text-secondary-500 bg-transparent"
        required
      />
    </div>
    <div class="flex justify-between gap-4 py-2">
      <label for="{action}PasswordConfirm" class="self-center">Confirm</label>
      <input
        type="password"
        name="{action}PasswordConfirm"
        id="{action}PasswordConfirm"
        class="border-4 border-surface-400 text-secondary-500 bg-transparent"
        required
      />
    </div>
    <div class="submit-container">
      <button type="submit" class="border-4 border-surface-400 p-1"
        >{header}</button
      >
    </div>
  </form>
</section>
