<script lang="ts">
  import { materialDefinition } from "$lib/ShaderGraph/_core/core";
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
    StandardNodeMaterial: StandardMaterialNode,
  };

  // todo - better re-rendering when config changes
  let refreshKey = 0;
</script>

<svelte:window
  on:resize={resize}
  on:mouseup={() => {
    if ($shaderGraphNeedsRefresh) {
      refreshKey++;
      console.log("refresh");
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
        <svelte:component this={materials[$materialDefinition.material]} />

        {#each Object.keys($materialDefinition.nodes) as id}
          {@const node = $materialDefinition.nodes[id]}
          <svelte:component this={nodeMap[node.type]} {...node} {id} />
        {/each}
      {/key}
    </Svelvet>
  </div>
{/if}

<LocalStorageSaver />
