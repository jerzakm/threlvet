<script lang="ts">
  import { GraphNode } from "$lib/ShaderGraph/_core/GraphNode";
  import { outputBuilder } from "$lib/ShaderGraph/_core/GraphNode/inOutBuilder";
  import { float, uv, mul } from "three/examples/jsm/nodes/Nodes";
  import { Slider } from "svelvet";
  import { writable } from "svelte/store";

  export let connections = {};

  export let id: number | undefined = undefined;

  export let position = { x: 0, y: 0 };

  export let processingData = {};

  const var_uv = uv();

  const output_uv = writable(var_uv);
  const output_x = writable(var_uv.x);
  const output_y = writable(var_uv.y);

  const outputDef: any = outputBuilder()
    .add("uv", "v2", output_uv)
    .add("x", "f", output_x)
    .add("y", "f", output_y)
    .build();
</script>

<GraphNode
  title="UV"
  {position}
  {id}
  {outputDef}
  {connections}
  nodeTypeId={"UVNode"} />
