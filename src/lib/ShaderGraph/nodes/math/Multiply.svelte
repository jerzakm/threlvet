<script lang="ts">
  import { GraphNode } from "$lib/ShaderGraph/_core/GraphNode";
  import {
    inputBuilder,
    outputBuilder,
  } from "$lib/ShaderGraph/_core/GraphNode/inOutBuilder";
  import { writable } from "svelte/store";
  import { float, mul } from "three/examples/jsm/nodes/Nodes";

  export let connections = {};

  export let id: number | undefined = undefined;

  export let position = { x: 0, y: 0 };

  export let processingData = {
    float: 0,
  };

  const output_f = writable(float(0));

  const procesor = (inputs: any) => {
    const result = mul(inputs.valueA || 0, inputs.valueB || 0);
    output_f.set(result);
  };

  const inputDef = inputBuilder()
    .add("valueA", "f", 1)
    .add("valueB", "f", 1)
    .procesor(procesor)
    .build();

  const outputDef: any = outputBuilder()
    .add("result", "f", output_f)
    .processingDataDependency(processingData)
    .procesor(procesor)
    .build();
</script>

<GraphNode
  title="Multiply"
  {position}
  {id}
  {inputDef}
  {outputDef}
  {connections}
  {processingData}
  nodeTypeId={"Multiply"} />
