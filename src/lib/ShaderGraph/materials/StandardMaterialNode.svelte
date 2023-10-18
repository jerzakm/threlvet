<script lang="ts">
  import NodeWrapper from "../NodeWrapper.svelte";
  import { generateInput, generateOutput, Slider, Node } from "svelvet";

  type Inputs = {
    width: number;
  };

  const initialData = {
    width: 2.5,
  };
  const inputs = generateInput(initialData);
  const procesor = (inputs: Inputs) => inputs.width;
  const output = generateOutput(inputs, procesor);

  $: console.log($output);
</script>

<Node useDefaults position={{ x: 400, y: 50 }} let:selected>
  <NodeWrapper
    title="StandardNodeMaterial"
    outputStore={output}
    key="strokeWidth">
    <div class="node-body">
      <Slider
        min={1}
        max={12}
        fixed={1}
        step={0.1}
        parameterStore={$inputs.width} />
    </div>
  </NodeWrapper>
</Node>

<style>
  .node-body {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
</style>
