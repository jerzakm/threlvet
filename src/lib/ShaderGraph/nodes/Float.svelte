<script lang="ts">
  import { writable } from "svelte/store";
  import { GraphNode } from "../_core/GraphNode";
  import { outputBuilder } from "../_core/GraphNode/inOutBuilder";
  import { float } from "three/examples/jsm/nodes/Nodes";
  import { Slider } from "svelvet";

  export let connections = {
    frames: [],
  };

  export let id: number | undefined = undefined;

  export let position = { x: 0, y: 0 };

  const processingData = {
    float: 0,
  };

  const procesor = (inputs: typeof processingData) => {
    return float(inputs.float);
  };
  const outputDef = outputBuilder()
    .add("float", "f", float(1))
    .processingDataDependency(processingData)
    .procesor(procesor)
    .build();

  const { processingStore } = outputDef;
  $: f = $processingStore.float;

  $: step = 0.001;
  $: max = Math.max(Math.abs($f * 10), 1);
  $: min = -max;
</script>

<GraphNode title="Float" {position} {id} {outputDef} {connections}>
  <Slider
    parameterStore={$processingStore.float}
    {step}
    {min}
    {max}
    fixed={3} />
</GraphNode>
