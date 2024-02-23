<script lang="ts">
  import UserInfo from "$lib/components/UserInfo.svelte";
  export let data;
  let { target } = data;

  // Modal Implementation
  import { getModalStore, type ModalSettings } from "@skeletonlabs/skeleton";
  const modalStore = getModalStore();
  async function deleteUser() {
    const modal: ModalSettings = {
      type: "confirm",
      // Data
      title: "Delete User",
      body: "Are you sure you want to delete your account?",
      // TRUE if confirm pressed, FALSE if cancel pressed
      response: async (r: boolean) => {
        console.log("response:", r);
        if (r) {
          await fetch(`/api/v1/users`, {
            method: "DELETE",
            body: JSON.stringify(target),
          });
          window.location.href = "/admin";
        }
      },
    };
    modalStore.trigger(modal);
  }
</script>

<div
  class="h-full w-full flex justify-center bg-surface-600 text-primary-500 text-xl font-bold"
>
  <div class="flex flex-col gap-2">
    <UserInfo user={target} />
    <button
      type="submit"
      on:click={deleteUser}
      class="w-fit self-end border-4 border-surface-400 h-fit p-1">Delete User</button
    >
  </div>
</div>
