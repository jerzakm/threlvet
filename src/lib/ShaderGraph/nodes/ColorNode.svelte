<script lang="ts">
  import { ColorPicker } from "svelvet";
  import { Color } from "three";
  import { color } from "three/examples/jsm/nodes/Nodes";
  import { GraphNode } from "$lib/ShaderGraph/_core/GraphNode";
  import { outputBuilder } from "$lib/ShaderGraph/_core/GraphNode/inOutBuilder";
  import { writable } from "svelte/store";

  export let connections = {
    color: [],
    r: [],
    g: [],
    b: [],
  };

  console.log(connections);

  export let id: number | undefined = undefined;
  export let position = { x: 0, y: 0 };

  export let processingData = {
    color: "#FFFFFF",
  };

  const c = new Color();

  const output_color = writable(color(c));
  const output_r = writable(color(c).r);
  const output_g = writable(color(c).g);
  const output_b = writable(color(c).b);

  const procesor = (inputs: typeof processingData) => {
    processingData = inputs;
    c.set(inputs.color);

    const color_var = color(c);

    output_color.set(color_var);
    output_r.set(color_var.r);
    output_g.set(color_var.b);
    output_b.set(color_var.b);

    return color(c);
  };

  // todo picker type err fix / better color picker
  const outputDef: any = outputBuilder()
    .add("color", "v4", output_color)
    .add("r", "f", output_r)
    .add("g", "f", output_g)
    .add("b", "f", output_b)
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
