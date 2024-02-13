<script lang="ts">
  import type { ActionData } from "./$types";
  import { enhance } from "$app/forms";

  export let form: ActionData;
</script>

<div class="flex flex-col gap-4 bg-surface-500 h-full overflow-auto justify-center lg:items-center text-2xl text-primary-500 font-bold">
  <div class="flex flex-wrap justify-center items-center gap-4">
<section class="border-4 border-surface-400 p-2">
  <h1>Login</h1>
  <form method="post" use:enhance>
    <div class="flex justify-between gap-4 py-2">
      <label for="email" class="self-center">Email</label>
      <input
        type="email"
        name="email"
        id="email"
        class="border-4 border-surface-400 text-secondary-500 bg-surface-500 w-48 sm:w-96"
        required
      />
    </div>
    <div class="flex justify-between gap-4 py-2">
      <label for="password" class="self-center">Password</label>
      <input
        type="password"
        name="password"
        id="password"
        class="border-4 border-surface-400 text-secondary-500 bg-surface-500 w-48 sm:w-96"
        required
      />
    </div>
    <div class="flex justify-between gap-4 py-2">
      <label for="passwordConfirm" class="self-center">Confirm</label>
      <input
        type="password"
        name="passwordConfirm"
        id="passwordConfirm"
        class="border-4 border-surface-400 text-secondary-500 bg-surface-500 w-48 sm:w-96"
        required
      />
    </div>
    <div class="submit-container">
      <button type="submit" formaction="?/signup" class="border-4 border-surface-400 p-1"
        >Sign Up</button
      >
      <button type="submit" formaction="?/login" class="border-4 border-surface-400 p-1"
        >Login</button
      >
    </div>
  </form>
</section>
  </div>
  {#if form?.error}
    <div class="border-4 border-surface-400 p-1 text-error-500">
      {form.error}
    </div>
  {/if}
</div>
