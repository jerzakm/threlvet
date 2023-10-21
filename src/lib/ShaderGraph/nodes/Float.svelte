<script lang="ts">
  import { GraphNode } from "$lib/ShaderGraph/_core/GraphNode";
  import { outputBuilder } from "$lib/ShaderGraph/_core/GraphNode/inOutBuilder";
  import { float } from "three/examples/jsm/nodes/Nodes";
  import * as x from "three/examples/jsm/nodes/Nodes";
  import { Slider } from "svelvet";
  import { writable } from "svelte/store";

  export let connections = {};

  export let id: number | undefined = undefined;

  export let position = { x: 0, y: 0 };

  export let processingData = {
    float: 0,
  };

  const output_f = writable(float(0));

  const procesor = (inputs: typeof processingData) => {
    processingData = inputs;
    output_f.set(float(inputs.float));
    // output_f.set(float(inputs.float));
    // return float(inputs.float);
  };

  const outputDef: any = outputBuilder()
    .add("float", "f", output_f)
    .processingDataDependency(processingData)
    .procesor(procesor)
    .build();

  const { processingStore } = outputDef;
  $: f = $processingStore.float;

  $: step = 0.001;
  $: max = Math.max(Math.abs($f * 1.3), 1);
  $: min = -max;
</script>

<GraphNode
  title="Float"
  {position}
  {id}
  {outputDef}
  {connections}
  {processingData}
  nodeTypeId={"Float"}>
  <Slider
    parameterStore={$processingStore.float}
    {step}
    {min}
    {max}
    fixed={3} />
</GraphNode>
