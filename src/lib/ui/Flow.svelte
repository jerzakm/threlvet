<script lang="ts">
  import StandardMaterialNode from "$lib/ShaderGraph/materials/StandardMaterialNode.svelte";
  import ColorNode from "$lib/ShaderGraph/nodes/ColorNode.svelte";
  import { Svelvet, Node, Anchor } from "svelvet";
  import { uiStores } from "./uiStores";
  import { materialDefinition } from "$lib/ShaderGraph/_core/core";

  let width = window.innerWidth;
  let height = window.innerHeight;

  const { shaderGraphOpen } = uiStores;

  const resize = () => {
    width = window.innerWidth;
    height = window.innerHeight;
  };

  const materials = {
    StandardNodeMaterial: StandardMaterialNode,
  };

  const nodes = {
    ColorNode: ColorNode,
  };

  // todo - better re-rendering when config changes
  let refreshKey = 0;
  let needsRefresh = false;

  $: $materialDefinition && (needsRefresh = true);
</script>

<svelte:window
  on:resize={resize}
  on:mouseup={() => {
    if (needsRefresh) {
      refreshKey++;
      needsRefresh = false;
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
          <svelte:component this={nodes[node.type]} {...node} {id} />
        {/each}
      {/key}
    </Svelvet>
  </div>
{/if}
