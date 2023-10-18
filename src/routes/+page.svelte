<script>
  import App from "$lib/App.svelte";
  import UI from "$lib/ui/UI.svelte";
</script>

<svelte:head>
  <title>Home</title>
  <meta name="description" content="Svelte demo app" />
</svelte:head>

<div class="fixed top-0 left-0">
  <UI />
</div>
<div class="fixed top-0 left-0 w-screen h-screen">
  <App />
</div>
