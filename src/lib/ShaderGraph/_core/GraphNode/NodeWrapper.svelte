<script lang="ts">
  import { generateInput, generateOutput, Node } from "svelvet";
  import { Inputs } from ".";
  import TypedAnchor from "../TypedAnchor.svelte";
  import type { ShaderNodeOutputDefinition } from "./inOutBuilder";
  import { materialDefinition } from "../core";
  import { uiStores } from "$lib/ui/uiStores";
  import { onMount } from "svelte";
  import SaveNewNode from "./SaveNewNode.svelte";
  import type { NodeTypeId } from "$lib/ShaderGraph/nodes";

  export let title: string;
  export let nodeTypeId: NodeTypeId | "material";

  /** INPUT STUFF*/
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

  /** OUTPUT STUFF*/
  export let outputDef: ShaderNodeOutputDefinition | undefined = undefined;
  export let connections: any | undefined = undefined;

  export let destroy: null | (() => void) = null;

  // lock in place if it's the material
  const id = $$restProps.id;
  const isMaterial = id === "material";
  $: materialPosition = isMaterial ? { position: { x: 1000, y: 400 } } : {};

  // save node position to store
  let currentPosition: any;

  $: {
    if (currentPosition && !isMaterial && $materialDefinition.nodes[id]) {
      if (
        // todo better compare ?
        JSON.stringify($materialDefinition.nodes[id]?.position) !==
        JSON.stringify(currentPosition)
      ) {
        $materialDefinition.nodes[id].position = currentPosition;
      }
    }
  }

  // re-initializing graph structure on crucial changes (output drops)
  const { shaderGraphNeedsRefresh } = uiStores;

  onMount(() => {
    // console.log("mountedd");
  });
</script>

<Node
  useDefaults
  {...$$restProps}
  {...materialPosition}
  let:node
  locked={id === "material"}
  bind:position={currentPosition}>
  <SaveNewNode {node} {nodeTypeId} />
  <div class="node flex flex-col gap-2 p-0 pb-2">
    <div class="header px-4 py-2">
      <span>{title}</span>
      {#if destroy}
        <button class="destroy" on:click={destroy}>X</button>
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

      <div class="flex gap-1 justify-end translate-x-6 min-w-[1rem]">
        {#if outputDef && connections}
          {#each outputDef.outputs as o}
            <!--  TODO allow multiple connections for outputs -->
            <TypedAnchor
              id={o.key}
              key={o.key}
              connections={connections[o.key]}
              type={o.type}
              outputStore={outputDef.outputStore}
              output
              on:connection={({ detail }) => {
                // from
                const [a1, fromAnchor, n1, fromNode] =
                  detail.anchor.id.split(/[-/]/);
                //to
                const [a2, toAnchor, n2, toNode] =
                  detail.connectedAnchor.id.split(/[-/]/);
                // save data - only 1 connection per output for now.
                $materialDefinition.nodes[fromNode].connections[fromAnchor] = [
                  [toNode, toAnchor],
                ];
              }}
              on:disconnection={(e) => {
                const detail = e.detail;
                const [anchor, anchorKey, node, nodeId] =
                  detail.anchor.id.split(/[-/]/);
                //@ts-ignore
                // this refreshes the material
                $materialDefinition.nodes[nodeId].connections[anchorKey] = [];
                shaderGraphNeedsRefresh.set(true);
              }} />
          {/each}
        {/if}
      </div>
    </div>
  </div>
</Node>
