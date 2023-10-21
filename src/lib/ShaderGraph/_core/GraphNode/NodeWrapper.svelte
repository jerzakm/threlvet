<script lang="ts">
  import type { NodeTypeId } from "$lib/ShaderGraph/nodes";
  import { uiStores } from "$lib/ui/uiStores";
  import { generateInput, generateOutput, Node } from "svelvet";
  import {
    activeMaterialDefinition,
    materialDefinition,
    newNode,
  } from "../core";
  import TypedAnchor from "../TypedAnchor.svelte";
  import type { ShaderNodeOutputDefinition } from "./inOutBuilder";
  import SaveNewNode from "./SaveNewNode.svelte";
  import {
    deleteConnection,
    deleteNode,
    makeNewConnection,
    saveProcessingData,
  } from "./nodeSaving";
  import { X } from "lucide-svelte";

  export let title: string;
  export let nodeTypeId: NodeTypeId | "material";
  export let isNewNode = false;

  // INPUT STUFF //
  export let inputDef: any | undefined = undefined;
  $: initialData =
    inputDef &&
    inputDef.inputs &&
    inputDef.inputs.map((input: any) => {
      const key = input.key;
      return { [key]: input.default };
    });

  $: inputs = generateInput(initialData);
  $: inputDef && inputs && generateOutput(inputs, inputDef.procesor);

  // OUTPUT STUFF //
  export let outputDef: ShaderNodeOutputDefinition | undefined = undefined;
  export let connections: any | undefined = undefined;

  // POSITION //
  //    - lock in place if it's the material
  const id = $$restProps.id;
  const isMaterial = id === "material";
  $: materialPosition = isMaterial ? { position: { x: 1000, y: 400 } } : {};

  //    - save node position to store
  let currentPosition: any;
  $: {
    if (
      currentPosition &&
      !isMaterial &&
      $activeMaterialDefinition !== undefined &&
      $materialDefinition &&
      $materialDefinition[$activeMaterialDefinition].nodes[id]
    ) {
      if (
        // todo better compare ?
        JSON.stringify(
          $materialDefinition[$activeMaterialDefinition].nodes[id]?.position
        ) !== JSON.stringify(currentPosition)
      ) {
        $materialDefinition[$activeMaterialDefinition].nodes[id].position =
          currentPosition;
        materialDefinition.set($materialDefinition);
      }
    }
  }

  // re-initializing graph structure on crucial changes (output drops)
  const { shaderGraphNeedsRefresh } = uiStores;

  // PROCESSING DATA
  export let processingData: any | undefined = undefined;

  $: {
    if (!isNewNode && processingData !== undefined) {
      saveProcessingData(id, processingData);
    }
  }
</script>

<Node
  useDefaults
  {...$$restProps}
  {...materialPosition}
  let:node
  let:selected
  locked={id === "material"}
  bind:position={currentPosition}
  drop={$newNode ? "cursor" : undefined}>
  {#if nodeTypeId !== "material"}
    <SaveNewNode {node} {nodeTypeId} />
  {/if}

  <!-- NODE UI -->
  <div class="node flex flex-col gap-2 p-0 pb-2 relative">
    <div class="px-4 py-2 border-b border-b-white/20">
      <span>{title} - {id}</span>
      {#if selected}
        <button
          class="absolute text-red-500 -right-7 -top-7 hover:bg-red-500 hover:text-white rounded-full"
          on:click={() => deleteNode(id)}>
          <X class="w-8 h-8" />
        </button>
      {/if}
    </div>
    <div class="flex">
      <div class="flex flex-col gap-1 -translate-x-6 min-w-[1rem]">
        {#if inputDef}
          {#each inputDef.inputs as i}
            <TypedAnchor
              id={i.key}
              key={i.key}
              input
              inputsStore={inputs}
              type={i.type} />
          {/each}
        {/if}
      </div>
      <div class="flex flex-col items-center justify-center flex-1">
        <slot />
      </div>

      <div class="flex flex-col gap-1 items-end translate-x-6 min-w-[1rem]">
        {#if outputDef && connections}
          {#each outputDef.outputs as o}
            <!--  TODO allow multiple connections for outputs -->
            <TypedAnchor
              id={o.key}
              key={o.key}
              connections={connections[o.key] ? connections[o.key] : []}
              type={o.type}
              outputStore={o.default}
              output
              on:connection={({ detail }) => {
                // from
                const [a1, fromAnchor, n1, fromNode] =
                  detail.anchor.id.split(/[-/]/);
                //to
                const [a2, toAnchor, n2, toNode] =
                  detail.connectedAnchor.id.split(/[-/]/);
                // save data - only 1 connection per output for now.
                makeNewConnection(fromNode, fromAnchor, toNode, toAnchor);
              }}
              on:disconnection={(e) => {
                const detail = e.detail;
                const [anchor, anchorKey, node, nodeId] =
                  detail.anchor.id.split(/[-/]/);

                deleteConnection(nodeId, anchorKey);
              }} />
          {/each}
        {/if}
      </div>
    </div>
  </div>
</Node>
