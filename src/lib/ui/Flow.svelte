<script lang="ts">
  import StandardMaterialNode from "$lib/ShaderGraph/materials/StandardMaterialNode.svelte";
  import ColorNode from "$lib/ShaderGraph/nodes/ColorNode.svelte";
  import { Svelvet, Node, Anchor } from "svelvet";
  import { uiStores } from "./uiStores";
  import { matConfig } from "./debugStuff";

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
</script>

<svelte:window on:resize={resize} />

{#if $shaderGraphOpen}
  <div class="fixed top-0 left-0">
    <Svelvet
      id="shadergraph-canvas"
      {width}
      {height}
      minimap
      theme="dark"
      edgeStyle="step">
      {#key matConfig}
        <svelte:component this={materials[$matConfig.material]} />
        {#each Object.keys($matConfig.nodes) as nodeId}
          {@const node = $matConfig.nodes[nodeId]}
          <svelte:component this={nodes[node.type]} {...node} />
        {/each}
      {/key}
    </Svelvet>
  </div>
{/if}
