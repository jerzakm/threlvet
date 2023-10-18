<script lang="ts">
  import { currentMaterial } from "$lib/materialStore";
  import type { ConvertType } from "three/examples/jsm/nodes/shadernode/ShaderNode";
  import NodeWrapper from "../NodeWrapper.svelte";
  import { generateInput, generateOutput, Slider, Node } from "svelvet";

  import {
    MeshStandardNodeMaterial,
    vec4,
  } from "three/examples/jsm/nodes/Nodes";

  type Inputs = {
    color: ReturnType<ConvertType>;
  };

  const initialData = {
    color: vec4(1, 1, 1, 1),
  };
  const material = new MeshStandardNodeMaterial({});
  const inputs = generateInput(initialData);
  const procesor = (inputs: Inputs) => {
    if (inputs.color) material.colorNode = inputs.color;

    material.needsUpdate = true;
    return material;
  };
  const output = generateOutput(inputs, procesor);

  $: {
    if ($inputs) {
      // console.log($inputs);
    }
    if ($output) {
      currentMaterial.set($output);
    }
  }
</script>

<NodeWrapper title="StandardNodeMaterial" inputsStore={inputs}>
  <div class="node-body">
    <!-- <Slider
        min={1}
        max={12}
        fixed={1}
        step={0.1}
        parameterStore={$inputs.color} /> -->
  </div>
</NodeWrapper>

<style>
  .node-body {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
</style>
