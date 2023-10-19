<script lang="ts">
  import { currentMaterial } from "$lib/materialStore";
  import type { ConvertType } from "three/examples/jsm/nodes/shadernode/ShaderNode";
  import NodeWrapper from "../_core/NodeWrapper.svelte";
  import { generateInput, generateOutput, Slider, Node, Anchor } from "svelvet";

  import {
    MeshStandardNodeMaterial,
    vec4,
  } from "three/examples/jsm/nodes/Nodes";
  import TypedAnchor from "../_core/TypedAnchor.svelte";
  import type { NodeInOut, NodeInOutType } from "../_core/shaderNode";

  const inputsT: NodeInOut = [
    {
      key: "color",
      type: "v4",
      default: vec4(1, 1, 1, 1),
    },
  ];

  // const initialData = {
  //   color: vec4(1, 1, 1, 1),
  // };

  const initialData: any = inputsT.map((input) => {
    const key = input.key;
    return { [key]: input.default };
  });

  console.log(initialData);

  const material = new MeshStandardNodeMaterial({});

  const inputs: any = generateInput(initialData);
  const procesor = (inputs: any) => {
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

<NodeWrapper
  title="StandardNodeMaterial"
  id="material"
  position={{ x: 800, y: 400 }}>
  <div slot="inputs">
    {#each inputsT as i}
      <TypedAnchor
        id="color"
        key={i.key}
        input
        inputsStore={inputs}
        type={i.type} />
    {/each}
    <!-- <Anchor
      id="color"
      let:connecting
      let:linked
      key="color"
      input
      inputsStore={inputs}>
      <div class="w-4 h-4 border border-black rounded-md" />
    </Anchor> -->
  </div>
  <div class="node-body">
    <span>color</span>
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
