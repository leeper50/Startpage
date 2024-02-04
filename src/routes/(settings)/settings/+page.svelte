<script lang="ts">
  import { FileDropzone, SlideToggle } from "@skeletonlabs/skeleton";
  import { enhance } from "$app/forms";
  import type { PageData } from "./$types";
  export let data: PageData;
  let { user } = data;
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
  let files: FileList;
  async function updateUser() {
    if (files) {
      user.pageData = await files[0].text();
    }
    fetch("/settings", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  async function resetUser() {
    user = { ...user, ...default_user };
    updateUser();
  }
</script>

<div
  class="flex flex-col h-full bg-surface-500 gap-2 text-primary-500 text-xl font-bold"
>
  <div class="flex gap-4 justify-center">
    <div class="border-4 p-4 border-surface-400">
      <h1>Homepage Style</h1>
      <p class="text-secondary-500">Switch between a minimal or fancy layout</p>
      <SlideToggle name="fancy" bind:checked={user.fancy} />
      {#if user.fancy}
        <p class="text-secondary-500">Toggle RSS visibility</p>
        <SlideToggle name="rssVisbility" bind:checked={user.rssVisibility} />
        {#if user.rssVisibility}
          <div class="input-field">
            <div>
              <label for="url">RSS Url:</label>
              <input
                type="text"
                bind:value={user.rssUrl}
                class="border-4 border-surface-400 bg-transparent"
              />
            </div>
            <div>
              <label for="url">RSS Key:</label>
              <input
                type="password"
                bind:value={user.rssApiKey}
                class="border-4 border-surface-400 bg-transparent"
              />
            </div>
          </div>
        {/if}
        <p class="text-secondary-500">Toggle Background visibility</p>
        <SlideToggle
          name="backgroundVisibility"
          bind:checked={user.backgroundVisibility}
        />
        <div class="input-field">
          <!-- GET WORKING (eventually) -->
          <!-- <div>
              <label for="url">Background Url:</label>
              <input
                type="text"
                bind:value={user.backgroundUrl}
                class="border-4 border-surface-400"
              />
            </div> -->
          {#if !user.backgroundVisibility}
            <div>
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
    <div class="border-4 p-4 border-surface-400">
      <h1>Homepage content</h1>
      <p class="text-secondary-500">
        Upload a valid yaml file to customize your landing page.
      </p>
      <p class="text-secondary-500">Here is an example of a valid yaml file.</p>
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
      <div class="flex flex-col gap-4 items-end">
        <FileDropzone
          name="files"
          accept=".yml, .yaml"
          padding="py-2"
          bind:files
          required
        >
          <svelte:fragment slot="message">Drop your file here</svelte:fragment>
          <svelte:fragment slot="meta"
            >Upload a .yml or .yaml file</svelte:fragment
          >
        </FileDropzone>
        <a href="links.yml" download="links.yml">
          <button class="border-4 border-surface-400 p-1">Template</button>
        </a>
      </div>
    </div>
  </div>
  <div class="flex justify-center gap-2">
    <button
      type="submit"
      on:click={updateUser}
      class="border-4 border-surface-400 h-fit p-1">Submit</button
    >
    <button
      type="submit"
      on:click={resetUser}
      class="border-4 border-surface-400 h-fit p-1">Reset</button
    >
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
