<script>
  import App from "$lib/App.svelte";
  import Flow from "$lib/ui/Flow.svelte";
  import UI from "$lib/ui/UI.svelte";
</script>

<svelte:head>
  <title>Home</title>
  <meta name="description" content="Svelte demo app" />
</svelte:head>

<div class="fixed top-0 left-0 z-20">
  <UI />
</div>
<Flow />
<div
  class="fixed top-0 right-0 w-[500px] h-[500px] pointer-events-none z-30
">
  <App />
</div>
