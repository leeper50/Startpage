<script lang="ts">
  import "@fontsource/fira-sans/600.css";
</script>

<div class="window">
    <span style="display: inline">
    <div class="settings">
        <a href="/" class="blue">Home</a>
        <a href="/login">⚙️</a>
    </div></span>
    <slot />
</div>
<style lang="scss">
    .window {
        margin: 0 8 0 8;
        width: 100%;
        height: 2vh;
        display: flex;
        flex-direction: column;
        font-family: "Fira Sans";
        font-weight: 600;
    }
    .settings {
        top: 12px;
        right: 12px;
        font-size: 1.5em;
        display: flex;
        justify-content: space-between;
        > a {
            text-decoration: none;
            &:hover {
                color: #d33682;
            }
        }
    }
</style>