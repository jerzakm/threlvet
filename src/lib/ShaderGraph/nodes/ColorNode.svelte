<script lang="ts">
  import {
    Anchor,
    ColorPicker,
    Edge,
    generateInput,
    generateOutput,
  } from "svelvet";
  import { Color } from "three";
  import { color } from "three/examples/jsm/nodes/Nodes";
  import { GraphNode, Outputs } from "../_core/GraphNode";
  import { outputBuilder } from "../_core/GraphNode/inOutBuilder";

  export let connections = {
    color: [],
    r: [],
    g: [],
    b: [],
  };

  export let id: number | undefined = undefined;

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

<GraphNode
  title="Color"
  position={{ x: 50, y: 400 }}
  {id}
  {outputDef}
  {connections}>
  <div class="node-body" slot="body">
    <ColorPicker parameterStore={$processingStore.color} />
  </div>
</GraphNode>

<style>
  .node-body {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .output-anchors {
    position: absolute;
    right: 0px;
    top: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
</style>
