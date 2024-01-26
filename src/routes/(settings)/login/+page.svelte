<script lang="ts">
  import type { ActionData } from "./$types";
  import { enhance } from "$app/forms";

  export let form: ActionData;
</script>

<div class="content blue">
  <div class="forms">
    <section class="border">
      <h1>Sign Up</h1>
      <form method="post" action="?/signup" use:enhance>
        <div class="group">
          <label for="signupEmail">Email</label>
          <input
            type="email"
            name="signupEmail"
            id="signupEmail"
            class="border"
            required
          />
        </div>
        <div class="group">
          <label for="signupPassword">Password</label>
          <input
            type="password"
            name="signupPassword"
            id="signupPassword"
            class="border"
            required
          />
        </div>
        <div class="group">
          <label for="signupPasswordConfirm">Confirm</label>
          <input
            type="password"
            name="signupPasswordConfirm"
            id="signupPasswordConfirm"
            class="border"
            required
          />
        </div>
        <div class="submit-container">
          <button type="submit" class="border">Sign Up</button>
        </div>
      </form>
    </section>
    <section class="border">
      <h1>Login</h1>
      <form method="post" action="?/login" use:enhance>
        <div class="group">
          <label for="loginEmail">Email</label>
          <input
            type="email"
            name="loginEmail"
            id="loginEmail"
            class="border"
            required
          />
        </div>
        <div class="group">
          <label for="loginPassword">Password</label>
          <input
            type="password"
            name="loginPassword"
            id="loginPassword"
            class="border"
            required
          />
        </div>
        <div class="group">
          <label for="loginPasswordConfirm">Confirm</label>
          <input
            type="password"
            name="loginPasswordConfirm"
            id="loginPasswordConfirm"
            class="border"
            required
          />
        </div>
        <div class="submit-container">
          <button type="submit" class="border">Login</button>
        </div>
      </form>
    </section>
  </div>
  {#if form?.error}
    <div class="border error">
      {form.error}
    </div>
  {/if}
</div>

<style lang="scss">
  .content {
    display: flex;
    flex-direction: column;
    gap: 16px;
    height: fit-content;
    height: 98vh;
    justify-content: center;
    align-items: center;
    font-size: 2em;
  }
  .error {
    padding: 8px;
  }
  .forms {
    display: flex;
    flex-wrap: wrap;
    gap: 40px;
    justify-content: center;
    align-items: center;
  }
  section {
    display: flex;
    flex-direction: column;
    height: fit-content;
    padding: 20px;
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .group {
    display: flex;
    justify-content: space-between;
    gap: 12px;
    label {
      align-self: center;
    }
  }
  button {
    background-color: inherit;
    color: inherit;
    font-family: inherit;
    font-size: inherit;
  }
  input {
    background-color: inherit;
    color: inherit;
    font-family: inherit;
    font-size: inherit;
  }
</style>
