<script lang="ts">
  import { materialDefinition } from "$lib/ShaderGraph/_core/core";
  import { onMount } from "svelte";
  import { uiStores } from "./uiStores";

  const { shaderGraphNeedsRefresh } = uiStores;

  let initialized = false;

  $: {
    if (initialized) {
      localStorage.setItem(
        "threlte_material",
        JSON.stringify($materialDefinition)
      );
    }
  }

  onMount(() => {
    const loadedStorage = localStorage.getItem("threlte_material");

    if (loadedStorage) {
      const parsedStorage = JSON.parse(loadedStorage);

      materialDefinition.set(parsedStorage);
      shaderGraphNeedsRefresh.set(true);
    }
    initialized = true;
  });
</script>
