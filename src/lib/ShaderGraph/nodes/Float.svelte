<script lang="ts">
  import { ColorPicker } from "svelvet";
  import { GraphNode } from "../_core/GraphNode";
  import { outputBuilder } from "../_core/GraphNode/inOutBuilder";
  import { float } from "three/examples/jsm/nodes/Nodes";
  import { Color } from "three";
  import { color } from "three/examples/jsm/nodes/Nodes";

  export let connections = {
    frames: [],
  };

  export let id: number | undefined = undefined;

  export let position = { x: 0, y: 0 };

  const processingData = {
    f: 0,
  };

  const procesor = (inputs: typeof processingData) => {
    return float(1);
  };
  const c = new Color();
  const outputDef: any = outputBuilder()
    .add("float", "f", float(1))
    .processingDataDependency(processingData)
    .procesor(procesor)
    .build();
</script>

<GraphNode title="Float" {position} {id} {outputDef} {connections}>
  Float picker here
</GraphNode>
