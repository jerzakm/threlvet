<script lang="ts">
  import type { CSSColorString } from "svelvet";
  import { Anchor, ColorPicker, generateInput, generateOutput } from "svelvet";
  import { Color } from "three";
  import { color } from "three/examples/jsm/nodes/Nodes";
  import NodeWrapper from "../NodeWrapper.svelte";

  export let connections = {
    color: [],
    r: [],
    g: [],
    b: [],
  };

  type Inputs = {
    color: CSSColorString;
  };

  const initialData: Inputs = {
    color: "#E94646",
  };

  const c = new Color();

  const inputs = generateInput(initialData);
  const procesor = (inputs: Inputs) => {
    c.set(inputs.color);

    return color(c);
  };
  const output = generateOutput(inputs, procesor);
</script>

<NodeWrapper title="Color" position={{ x: 50, y: 400 }}>
  <div />
  <div class="node-body">
    <ColorPicker parameterStore={$inputs.color} />
  </div>
  <div class="output-anchors">
    <div class="flex gap-1">
      <span>rgba</span>
      <Anchor
        id="color-anchor"
        outputStore={output}
        output
        connections={connections.color} />
    </div>
    <div class="flex gap-1">
      <span>rgb</span>
      <!-- <Anchor
        id="color-anchor"
        outputStore={output}
        output
        connections={connections.rgb} /> -->
    </div>
  </div>
</NodeWrapper>

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
  .note {
    font-family: "Reenie Beanie", sans-serif;
    position: absolute;
    top: 10%;
    left: 240px;
    width: 400px;
    transform: rotate(-6deg);
    color: inerhit;
    font-weight: 200px;
    font-size: 30px;
    pointer-events: none;
  }
</style>
