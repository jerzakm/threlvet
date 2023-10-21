<script lang="ts">
  import { onMount } from "svelte";
  import { materialDefinition } from "../core";
  import type { NodeTypeId } from "$lib/ShaderGraph/nodes";
  import type { Node } from "svelvet";

  export let node: Node;
  export let nodeTypeId: NodeTypeId;

  onMount(() => {
    const existingNodes = Object.keys($materialDefinition.nodes);
    const [n, nodeId] = node.id.split("-");

    if (nodeId === "material") return;
    if (existingNodes.includes(nodeId)) return;

    console.log(
      `should add a new node id: ${nodeId} of type ${nodeTypeId} now`
    );
  });
</script>
