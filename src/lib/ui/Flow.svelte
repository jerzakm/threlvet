<script>
  import { Node, Svelvet, Minimap, Controls } from "svelvet";
  import { uiStores } from "./uiStores";
  import StandardMaterialNode from "$lib/ShaderGraph/materials/StandardMaterialNode.svelte";
  import ColorNode from "$lib/ShaderGraph/nodes/ColorNode.svelte";

  let width = window.innerWidth;
  let height = window.innerHeight;

  const { shaderGraphOpen } = uiStores;

  const resize = () => {
    width = window.innerWidth;
    height = window.innerHeight;
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
      edgeStyle="step"
      TD>
      <StandardMaterialNode />
      <ColorNode />
    </Svelvet>
  </div>
{/if}
