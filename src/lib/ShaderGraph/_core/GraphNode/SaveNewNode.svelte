<script lang="ts">
  import { onMount } from "svelte";
  import {
    activeMaterialDefinition,
    materialDefinition,
    newNode,
  } from "../core";
  import type { NodeTypeId } from "$lib/ShaderGraph/nodes";
  import { get } from "svelte/store";

  export let node: any;
  export let nodeTypeId: NodeTypeId;

  onMount(() => {
    if (
      $materialDefinition !== undefined &&
      $activeMaterialDefinition !== undefined &&
      $newNode
    ) {
      const existingNodes = Object.keys(
        $materialDefinition[$activeMaterialDefinition].nodes
      );
      const [n, nodeId] = node.id.split("-");
      if (nodeId === "material") return;
      if (existingNodes.includes(nodeId)) return;

      const position = get(node.position) as any;

      $materialDefinition[$activeMaterialDefinition].nodes[nodeId] = {
        type: nodeTypeId,
        position: {
          x: position.x || 0,
          y: position.y || 0,
        },
      };
      materialDefinition.set($materialDefinition);

      newNode.set(undefined);
    }
  });
</script>
