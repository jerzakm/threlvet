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

  export let processingData = {
    color: "#FFFFFF",
  };

  const c = new Color();

  const procesor = (inputs: typeof processingData) => {
    processingData = inputs;
    c.set(inputs.color);
    return color(c);
  };

  // todo picker type err fix / better color picker
  const outputDef: any = outputBuilder()
    .add("color", "v4", color(c))
    .processingDataDependency(processingData)
    .procesor(procesor)
    .build();

  const { processingStore } = outputDef;
</script>

<GraphNode
  title="Color"
  {position}
  {id}
  {outputDef}
  {processingData}
  {connections}
  nodeTypeId={"ColorNode"}>
  <ColorPicker parameterStore={$processingStore.color} />
</GraphNode>
