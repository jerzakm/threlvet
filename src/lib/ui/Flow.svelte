<script lang="ts">
  import {
    activeMaterialDefinition,
    materialDefinition,
    newNode,
  } from "$lib/ShaderGraph/_core/core";
  import StandardMaterialNode from "$lib/ShaderGraph/materials/StandardMaterialNode.svelte";

  import { Svelvet } from "svelvet";
  import { uiStores } from "./uiStores";
  import { nodeMap } from "$lib/ShaderGraph/nodes";
  import LocalStorageSaver from "./LocalStorageSaver.svelte";

  let width = window.innerWidth;
  let height = window.innerHeight;

  const { shaderGraphOpen, shaderGraphNeedsRefresh } = uiStores;

  const resize = () => {
    width = window.innerWidth;
    height = window.innerHeight;
  };

  const materials = {
    StandardMaterialNode: StandardMaterialNode,
  };

  // todo - better re-rendering when config changes
  let refreshKey = 0;
  $: {
    // re-render on material change
    if (
      $activeMaterialDefinition !== undefined &&
      refreshKey > 0 &&
      $shaderGraphNeedsRefresh
    ) {
      console.log("refresh");
      refreshKey++;
      shaderGraphNeedsRefresh.set(false);
    }
  }

  $: console.log($newNode);
</script>

<svelte:window
  on:resize={resize}
  on:mouseup={() => {
    if ($shaderGraphNeedsRefresh) {
      refreshKey++;
      shaderGraphNeedsRefresh.set(false);
    }
  }} />

{#if $shaderGraphOpen}
  <div class="fixed top-0 left-0">
    <Svelvet
      id="shadergraph-canvas"
      {width}
      {height}
      minimap
      theme="dark"
      edgeStyle="step">
      {#key refreshKey}
        {#if $materialDefinition && $activeMaterialDefinition !== undefined}
          <!-- MATERIAL -->
          <svelte:component
            this={materials[
              $materialDefinition[$activeMaterialDefinition].material
            ]} />
          <!-- NODES -->
          {#each Object.keys($materialDefinition[$activeMaterialDefinition].nodes) as id}
            {@const node =
              $materialDefinition[$activeMaterialDefinition].nodes[id]}
            <svelte:component this={nodeMap[node.type]} {...node} {id} />
          {/each}
          <!-- NEW NODE -->
        {/if}
      {/key}
      {#if $newNode}
        <svelte:component
          this={nodeMap[$newNode.type]}
          id={$newNode.id}
          isNewNode />
      {/if}
    </Svelvet>
  </div>
{/if}

<LocalStorageSaver />
