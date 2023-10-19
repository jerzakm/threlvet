<script lang="ts">
  import { ColorPicker } from "svelvet";
  import { GraphNode } from "../_core/GraphNode";
  import { outputBuilder } from "../_core/GraphNode/inOutBuilder";
  import { float } from "three/examples/jsm/nodes/Nodes";

  export let connections = {
    color: [],
    r: [],
    g: [],
    b: [],
  };

  export let id: number | undefined = undefined;

  export let position = { x: 0, y: 0 };

  const processingData = {
    float: 1,
  };

  const procesor = (inputs: typeof processingData) => {
    return float(inputs.float);
  };

  const outputDef = outputBuilder()
    .add("float", "f", float(processingData.float))
    .processingDataDependency(processingData)
    .procesor(procesor)
    .build();

  const { processingStore } = outputDef;
</script>

<GraphNode title="Float" {position} {id} {outputDef} {connections}>
  Float picker here
  <!-- <ColorPicker parameterStore={$processingStore.color} /> -->
</GraphNode>
