<script>
  import "../app.postcss";
</script>

<slot />

<style>
  :global(body) {
    @apply bg-gray-100;
    /* @apply font-mono; */
  }
</style>
