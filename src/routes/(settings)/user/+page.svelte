<script lang="ts">
  import UserInfo from "$lib/components/UserInfo.svelte";
  export let data;
  let { user } = data;

  // Modal Implementation
  import { getModalStore, type ModalSettings } from "@skeletonlabs/skeleton";
  const modalStore = getModalStore();
  async function deleteUser() {
    const modal: ModalSettings = {
      type: "confirm",
      // Data
      title: "Delete User",
      body: "Are you sure you want to delete this user?",
      // TRUE if confirm pressed, FALSE if cancel pressed
      response: async (r: boolean) => {
        console.log("response:", r);
        if (r) {
          await fetch(`/api/v1/users`, {
            method: "DELETE",
            body: JSON.stringify(user),
          });
          window.location.href = "/login";
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
    <UserInfo {user} />
    <button
      type="submit"
      on:click={deleteUser}
      class="w-fit self-end border-4 border-surface-400 h-fit p-1"
      >Delete User</button
    >
  </div>
</div>
