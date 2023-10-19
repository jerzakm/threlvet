<script lang="ts">
  import { currentMaterial } from "$lib/materialStore";
  import type { ConvertType } from "three/examples/jsm/nodes/shadernode/ShaderNode";
  import { GraphNode, Inputs } from "../_core/GraphNode";
  import { generateInput, generateOutput, Slider, Node, Anchor } from "svelvet";

  import {
    MeshStandardNodeMaterial,
    vec4,
  } from "three/examples/jsm/nodes/Nodes";
  import TypedAnchor from "../_core/TypedAnchor.svelte";
  import type { NodeInOut, NodeInOutType } from "../_core/shaderNode";

  const indputDefinition: NodeInOut = [
    {
      key: "color",
      type: "v4",
      default: vec4(1, 1, 1, 1),
    },
  ];

  const initialData: any = indputDefinition.map((input) => {
    const key = input.key;
    return { [key]: input.default };
  });

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

<GraphNode
  title="StandardNodeMaterial"
  id="material"
  position={{ x: 800, y: 400 }}>
  <Inputs slot="inputs">
    {#each indputDefinition as i}
      <TypedAnchor
        id="color"
        key={i.key}
        input
        inputsStore={inputs}
        type={i.type} />
    {/each}
  </Inputs>
  <div class="flex flex-col items-center justify-center">
    <!-- <span>color</span> -->
    <!-- <Slider
        min={1}
        max={12}
        fixed={1}
        step={0.1}
        parameterStore={$inputs.color} /> -->
  </div>
</GraphNode>
