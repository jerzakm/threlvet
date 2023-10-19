<script lang="ts">
  import {
    Anchor,
    ColorPicker,
    generateInput,
    generateOutput,
    Edge,
  } from "svelvet";
  import { Color } from "three";
  import { color } from "three/examples/jsm/nodes/Nodes";
  import { GraphNode, Outputs } from "../_core/GraphNode";
  import { matConfig } from "$lib/ui/debugStuff";
  import { get } from "svelte/store";
  import { uiStores } from "$lib/ui/uiStores";

  export let connections = {
    color: [],
    r: [],
    g: [],
    b: [],
  };

  export let id: number | undefined = undefined;

  const initialData = {
    color: "#E94646",
  };

  const c = new Color();

  $: inputs = generateInput(initialData);
  const procesor = (inputs) => {
    c.set(inputs.color);
    return color(c);
  };

  $: output = generateOutput(inputs, procesor);
</script>

<GraphNode title="Color" position={{ x: 50, y: 400 }} {id}>
  <div class="node-body" slot="body">
    <ColorPicker parameterStore={$inputs.color} />
  </div>

  <Outputs slot="output">
    <div class="flex gap-1">
      <span>rgba</span>
      <Anchor
        id="color"
        outputStore={output}
        output
        connections={connections.color}
        let:connecting
        on:connection={({ detail }) => {}}
        on:disconnection={(e) => {
          const detail = e.detail;
          const [anchor, anchorKey, node, nodeId] =
            detail.anchor.id.split(/[-/]/);
          $matConfig.nodes[nodeId].connections[anchorKey] = [];
        }}>
        <Edge slot="edge" />
      </Anchor>
    </div>
  </Outputs>
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
