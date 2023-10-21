<script lang="ts">
  import { GraphNode } from "$lib/ShaderGraph/_core/GraphNode";
  import {
    inputBuilder,
    outputBuilder,
  } from "$lib/ShaderGraph/_core/GraphNode/inOutBuilder";
  import { writable } from "svelte/store";
  import { float, sin } from "three/examples/jsm/nodes/Nodes";

  export let connections = {};

  export let id: number | undefined = undefined;

  export let position = { x: 0, y: 0 };

  export let processingData = {
    value: 0,
  };

  const output_f = writable(float(0));

  const procesor = (inputs: any) => {
    console.log(inputs);
    const result = sin(inputs.value || 0);
    output_f.set(result);
  };

  const inputDef = inputBuilder()
    .add("value", "f", 1)
    .procesor(procesor)
    .build();

  const outputDef: any = outputBuilder()
    .add("sin", "f", output_f)
    .processingDataDependency(processingData)
    .procesor(procesor)
    .build();
</script>

<GraphNode
  title="Sin"
  {position}
  {id}
  {inputDef}
  {outputDef}
  {connections}
  {processingData}
  nodeTypeId={"Sin"} />
