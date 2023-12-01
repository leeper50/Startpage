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
  <main class="blue main-font">
    <pre class="main-font">
Upload a valid yaml file to customize your landing page. 
Here is an example of a valid yaml file.
    </pre>
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
    <a href="links.yml" download="links.yml">
      <button class="border gray">Get template</button>
    </a>
    <form method="post" enctype="multipart/form-data">
      <div>
        <label for="file" class="gray file-upload border">Upload file o' links</label
        >
        <input
          type="file"
          id="file"
          name="fileToUpload"
          accept=".yml, .yaml"
          required
        />
      </div>
      <span class="button-bar">
        <button type="submit" class="border gray">Submit</button>
        <button on:click={reset} type="reset" class="border gray">Reset</button>
      </span>
    </form>
  </main>
</body>

<style lang="scss">
  body {
    justify-content: center;
  }
  main {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  .main-font {
    font-family: "Fira Sans";
    font-size: 1.5rem;
    font-weight: normal;
  }
  form {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    gap: 12px;
  }
  .file-upload,
  button {
    font-family: "Fira Sans";
    font-size: 1em;
    padding: 4px;
    background-color: inherit;
    min-width: fit-content;
    max-width: 64px;
    cursor: pointer;
  }
  input[type="file"] {
    display: none;
  }
  .button-bar {
    display: flex;
    justify-content: space-between;
  }
</style>
