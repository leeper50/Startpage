<script lang="ts">
  import "@fontsource/fira-sans/600.css";
  import type { PageData } from "./$types";
  export let data: PageData;
  function reset() {
    fetch("/upload", {
      method: "Delete",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
</script>

<body>
  <main class="blue">
    <p>Upload a valid yaml file to customize your landing page.</p>
    <p>Here is an example of a valid yaml file.</p>
    <pre>
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
    <form method="post" enctype="multipart/form-data">
      <div class="group">
        <label for="file">Upload your file o' links</label>
        <input
          type="file"
          id="file"
          name="fileToUpload"
          accept=".yml, .yaml"
          required
        />
      </div>
      <button type="submit">Submit</button>
    </form>
    <button on:click={reset} type="reset">Reset</button>
  </main>
</body>

<style lang="scss">
  body {
    width: 100%;
    height: 100%;
    display: flex;
    font-size: 1.5rem;
    font-family: "Fira Sans";
    justify-content: center;
    padding: 0;
    margin: 0;
    background-color: #222;
  }
  main {
    display: flex;
    flex-direction: column;
    gap: 4px;
    margin: 12px;
  }
  form {
    font-weight: bold;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    gap: 12px;
    margin: 0px;
  }
  input,
  button {
    min-width: fit-content;
    max-width: 64px;
  }
</style>
