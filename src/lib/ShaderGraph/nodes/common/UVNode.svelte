<script lang="ts">
  import { GraphNode } from "$lib/ShaderGraph/_core/GraphNode";
  import { outputBuilder } from "$lib/ShaderGraph/_core/GraphNode/inOutBuilder";
  import { float, uv } from "three/examples/jsm/nodes/Nodes";
  import { Slider } from "svelvet";

  export let connections = {};

  export let id: number | undefined = undefined;

  export let position = { x: 0, y: 0 };

  export let processingData = {};

  const procesor = () => {
    return uv();
  };
  const outputDef: any = outputBuilder()
    .add("uv", "v2", uv())
    .processingDataDependency(processingData)
    .procesor(procesor)
    .build();
</script>

<GraphNode
  title="UV"
  {position}
  {id}
  {outputDef}
  {connections}
  nodeTypeId={"UVNode"} />
