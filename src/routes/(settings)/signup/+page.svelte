<script lang="ts">
  import type { ActionData } from "./$types";
  import { enhance } from "$app/forms";

  export let form: ActionData;
</script>

<body>
  <section class="blue">
    <h1>Sign Up</h1>
    <form method="post" use:enhance>
      <div class="group">
        <label for="email">Email</label>
        <input type="email" name="email" id="email" required />
      </div>

      <div class="group">
        <label for="password">Password</label>
        <input type="password" name="password" id="password" required />
      </div>

      <div class="submit-container">
        <button type="submit">Sign Up</button>
      </div>

      {#if form?.error}
        <div class="notice error">
          {form.error}
        </div>
      {/if}
    </form>

    <div class="actions">
      <a href="/login">Login</a>
    </div>
  </section>
</body>

<style lang="scss">
  section {
    display: flex;
    flex-direction: column;
  }
</style>
