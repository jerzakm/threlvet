<script lang="ts">
  import {
    generateInput,
    generateOutput,
    Resizer,
    ColorPicker,
    Node,
    Anchor,
  } from "svelvet";
  import type { CSSColorString } from "svelvet";
  import NW from "./NW.svelte";
  import { Color } from "three";
  import { color } from "three/examples/jsm/nodes/Nodes";

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

<Node useDefaults position={{ x: 50, y: 400 }} let:selected>
  <NW title="Color" key="color">
    <div class="node-body">
      <ColorPicker parameterStore={$inputs.color} />
    </div>
    <div class="output-anchors">
      <Anchor
        id="color-anchor"
        outputStore={output}
        output
        connections={[["material", "color"]]} />
    </div>
  </NW>
  <Resizer rotation />
</Node>

<style>
  .node-body {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .output-anchors {
    position: absolute;
    right: -24px;
    top: 8px;
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
