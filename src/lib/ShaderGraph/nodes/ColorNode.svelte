<script lang="ts">
  import { ColorPicker } from "svelvet";
  import { Color } from "three";
  import { color } from "three/examples/jsm/nodes/Nodes";
  import { GraphNode } from "../_core/GraphNode";
  import { outputBuilder } from "../_core/GraphNode/inOutBuilder";

  export let connections = {
    color: [],
    r: [],
    g: [],
    b: [],
  };

  export let id: number | undefined = undefined;

  export let position = { x: 0, y: 0 };

  const processingData = {
    color: "#E94646",
  };

  const c = new Color();

  const procesor = (inputs) => {
    c.set(inputs.color);
    return color(c);
  };

  const outputDef = outputBuilder()
    .add("color", "v4", color(c))
    .processingDataDependency(processingData)
    .procesor(procesor)
    .build();

  const { processingStore } = outputDef;
</script>

<GraphNode title="Color" {position} {id} {outputDef} {connections}>
  <ColorPicker parameterStore={$processingStore.color} />
</GraphNode>
