<script lang="ts">
  import "@fontsource/fira-sans/200.css";
</script>

<body class="blue">
  <div class="main">
    <h1>Da configs 😳</h1>
    <hr />
    <a href="files/Packages.zip" download>windows packages</a>
    - this is a list of windows packages
    <br />
    <a href="files/MyMacros.ahk" download>autohotkey scripts</a>
    - all my silly little shortcuts
  </div>
</body>

<style lang="scss">
  body {
    justify-content: center;
    width: 100%;
  }
  a {
    color: #268bd2;
    &:hover {
      color: #d33682;
    }
  }
  hr {
    border-radius: 4px;
    border: 4px solid #444;
    width: 100%;
  }
  .main {
    font-family: "Fira Sans";
    font-size: 2em;
    padding: 16px;
    text-align: center;
    width: 75%;
  }
</style>
