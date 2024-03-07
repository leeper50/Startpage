<script lang="ts">
  import { SlideToggle } from "@skeletonlabs/skeleton";
  import { enhance } from "$app/forms";
  import YAML from "yaml";
  import type { PageData } from "./$types";
  import isEqual from "lodash/isEqual";
  export let data: PageData;
  let { user, default_links } = data;
  const unchangedUser = { ...user };
  const default_user = {
    pageData: "",
    fancy: true,
    rssVisibility: false,
    rssUrl: "",
    rssApiKey: "",
    backgroundVisibility: true,
    backgroundUrl: "",
    backgroundColor: "#081118",
  };
  // Alert Modal
  import { getModalStore, type ModalSettings } from "@skeletonlabs/skeleton";
  const modalStore = getModalStore();
  function inputError(msg: string) {
    const modal: ModalSettings = {
      type: "alert",
      title: "Updating Page Data",
      body: msg,
    };
    modalStore.trigger(modal);
  }
  async function updateUser() {
    // Check if YAML was changed
    const userLinks = document.getElementById("pageData")!.innerHTML;
    if (userLinks !== user.pageData) {
      // Test if yaml is valid
      let array: YamlLinks;
      try {
        array = YAML.parse(userLinks);
      } catch (e) {
        inputError("Must be valid YAML");
        return;
      }
      // @ts-ignore This is an array (trust)
      if (!array || array.length === 0) {
        inputError("Must be a valid list (check syntax)");
        return;
      }
      array.forEach((i) => {
        if (i.title === "") {
          inputError("Each group must have a title");
          return;
        }
        i.list.forEach((j) => {
          if (j.url === "" || j.id === "") {
            inputError("Each item must have an id and url");
            return;
          }
        });
      });
      user.pageData = userLinks;
    }

    // Update user info
    fetch("/settings", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    });
    window.location.href = "";
  }
  async function hardResetUser() {
    const modal: ModalSettings = {
      type: "confirm",
      title: "Reset User",
      body: "Are you sure you want to completely reset your account?",
      response: async (r: boolean) => {
        console.log("response:", r);
        if (r) {
          user = { ...user, ...default_user };
          await updateUser();
        }
      },
    };
    modalStore.trigger(modal);
  }
  async function softResetUser() {
    user = { ...unchangedUser };
  }
</script>

<div
  class="flex flex-col h-full bg-surface-600 pt-4 gap-2 text-primary-500 text-xl font-bold"
>
  <div class="flex flex-wrap gap-4 justify-center">
    <div class="w-xl border-4 p-4 border-surface-400">
      <h1>Homepage Style</h1>
      <div class="flex justify-between gap-4 pb-2">
        <p class="text-secondary-500">
          Switch between a minimal or fancy layout
        </p>
        <SlideToggle name="fancy" bind:checked={user.fancy} />
      </div>
      <div class="flex justify-between pb-2">
        <p class="text-secondary-500">Toggle RSS visibility</p>
        <SlideToggle name="rssVisbility" bind:checked={user.rssVisibility} />
      </div>
      {#if user.rssVisibility}
        <div class="flex justify-between pb-2">
          <label for="url">RSS Url:</label>
          <input
            type="text"
            bind:value={user.rssUrl}
            class="border-4 border-surface-400 bg-transparent"
          />
        </div>
        <div class="flex justify-between pb-2">
          <label for="url">RSS Key:</label>
          <input
            type="password"
            bind:value={user.rssApiKey}
            class="border-4 border-surface-400 bg-transparent"
          />
        </div>
      {/if}
      {#if user.fancy}
        <div class="flex justify-between pb-2">
          <p class="text-secondary-500">Toggle Background visibility</p>
          <SlideToggle
            name="backgroundVisibility"
            bind:checked={user.backgroundVisibility}
          />
        </div>
        <div>
          {#if !user.backgroundVisibility}
            <div class="flex justify-between pb-2">
              <label for="url">Background Color:</label>
              <input
                type="color"
                bind:value={user.backgroundColor}
                class="border-4 border-surface-400"
                style="height: 36px;"
              />
            </div>
          {/if}
        </div>
      {/if}
    </div>
    <div
      class="border-4 p-4 flex flex-wrap gap-4 border-surface-400 max-w-sm sm:max-w-fit overflow-hidden"
    >
      <div class="h-[512px]">
        <h1>Homepage content</h1>
        <p class="text-secondary-500">
          Upload a valid yaml file to customize your landing page.
        </p>
        <p class="text-secondary-500">
          Here is an example of a valid yaml file.
        </p>
        <pre class="text-primary-400">
- title: group1
  list:
    - url: https://www.example.com/
      id: Example
- title: group2
  list:
    - url: https://google.com/
      id: Foo
    - url: https://duckduckgo.com/
      id: Bar
- title: group3
  list:
    - url: https://bing.com/
      id: Foobar
      </pre>
      </div>
      <div
        class="h-[512px] overflow-scroll
        focus:outline-none outline-none
        border-4 border-surface-400"
      >
        <div class="text-primary-400">
          <pre
            id="pageData"
            class="pl-1 min-w-24 min-h-full"
            contenteditable="true">
{user.pageData || YAML.stringify(default_links)}
</pre>
        </div>
      </div>
    </div>
  </div>
  <div class="flex justify-center gap-2">
    <button
      type="submit"
      on:click={updateUser}
      class="border-4 border-surface-400 h-fit p-1">Save</button
    >
    <button
      type="submit"
      on:click={hardResetUser}
      class="border-4 border-surface-400 h-fit p-1">Reset User</button
    >
    {#if !isEqual(user, unchangedUser)}
      <button
        type="submit"
        on:click={softResetUser}
        class="border-4 border-surface-400 h-fit p-1">Revert changes</button
      >
    {/if}
    <form method="POST" action="?/logout" use:enhance>
      <button
        type="submit"
        name="logout"
        value="true"
        class="border-4 border-surface-400 h-fit w-full p-1">Logout</button
      >
    </form>
  </div>
</div>
