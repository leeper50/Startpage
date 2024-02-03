<script lang="ts">
  import type { ActionData } from "./$types";
  import UserForm from "$lib/components/UserForm.svelte"

  export let form: ActionData;
</script>

<div class="flex flex-col gap-4 bg-surface-500 h-full overflow-auto justify-center lg:items-center text-2xl text-primary-500 font-bold">
  <div class="flex flex-wrap justify-center items-center gap-4">
    <UserForm header="Sign Up" action="signup"/>
    <UserForm header="Log In" action="login"/>
  </div>
  {#if form?.error}
    <div class="border-4 border-surface-400 p-1 text-error-500">
      {form.error}
    </div>
  {/if}
</div>
