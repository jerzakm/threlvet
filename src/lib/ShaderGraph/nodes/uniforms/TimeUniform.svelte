<script lang="ts">
  import { GraphNode } from "$lib/ShaderGraph/_core/GraphNode";
  import { outputBuilder } from "$lib/ShaderGraph/_core/GraphNode/inOutBuilder";
  import { currentMaterial } from "$lib/ShaderGraph/_core/core";
  import { onMount } from "svelte";
  import { writable } from "svelte/store";
  import { uniform } from "three/examples/jsm/nodes/Nodes";

  export let connections = {};

  export let id: number | undefined = undefined;

  export let position = { x: 0, y: 0 };

  export let processingData = {};

  const iTime = writable(uniform(0));

  // todo uniform naming and registration via hook?
  onMount(() => {
    $currentMaterial.uniforms.iTime = $iTime;
  });

  const outputDef: any = outputBuilder().add("time", "f", iTime).build();
</script>

<GraphNode
  title="TimeUniform"
  {position}
  {id}
  {outputDef}
  {connections}
  nodeTypeId={"TimeUniform"} />
