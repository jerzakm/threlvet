<script lang="ts">
  import {
    activeMaterialDefinition,
    materialDefinition,
  } from "$lib/ShaderGraph/_core/core";
  import { onMount } from "svelte";
  import { uiStores } from "./uiStores";

  const { shaderGraphNeedsRefresh } = uiStores;

  let initialized = false;

  $: {
    if (initialized && $materialDefinition) {
      localStorage.setItem(
        "threlte_material",
        JSON.stringify($materialDefinition)
      );
    }
  }

  onMount(() => {
    const loadedStorage = localStorage.getItem("threlte_material");

    // if no previous config is loaded, open a window to create a new material

    // todo - different local storage behaviour between browsers
    if (
      loadedStorage !== null &&
      loadedStorage !== undefined &&
      loadedStorage !== "undefined"
    ) {
      const parsedStorage = JSON.parse(loadedStorage);
      materialDefinition.set(parsedStorage);
      activeMaterialDefinition.set(0);
      shaderGraphNeedsRefresh.set(true);
    } else {
      uiStores.needNewMaterial.set(true);
    }
    initialized = true;
  });
</script>
