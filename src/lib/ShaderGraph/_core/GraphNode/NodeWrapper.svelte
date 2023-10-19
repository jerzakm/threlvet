<script lang="ts">
  import { generateInput, generateOutput, Node } from "svelvet";
  import { Inputs } from ".";
  import TypedAnchor from "../TypedAnchor.svelte";
  import type { ShaderNodeOutputDefinition } from "./inOutBuilder";
  import { materialDefinition } from "../core";
  import { uiStores } from "$lib/ui/uiStores";

  export let title: string;

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
  $: materialPosition = isMaterial ? { position: { x: 700, y: 400 } } : {};

  // save node position to store
  let currentPosition: any;
  $: {
    if (currentPosition && !isMaterial && $materialDefinition.nodes[id]) {
      $materialDefinition.nodes[id].position = currentPosition;
    }
  }

  // re-initializing graph structure on crucial changes (output drops)
  const { shaderGraphNeedsRefresh } = uiStores;
</script>

<Node
  useDefaults
  {...$$restProps}
  {...materialPosition}
  locked={id === "material"}
  bind:position={currentPosition}>
  <div class="node flex flex-col gap-2 p-0 pb-2">
    <div class="header px-4 py-2">
      <span>{title}</span>
      {#if destroy}
        <button class="destroy" on:click={destroy}>X</button>
      {/if}
    </div>
    <div class="grid grid-cols-[2rem_1fr_2rem]">
      <div class="flex flex-col gap-1 -translate-x-6">
        {#if inputDef}
          <Inputs>
            {#each inputDef.inputs as i}
              <TypedAnchor
                id="color"
                key="color"
                input
                inputsStore={inputs}
                type={i.type} />
            {/each}
          </Inputs>
        {/if}
      </div>
      <div class="flex flex-col items-center justify-center">
        <slot />
      </div>

      <div class="flex gap-1 justify-end translate-x-6">
        {#if outputDef}
          {#each outputDef.outputs as o}
            <TypedAnchor
              id={o.key}
              key={o.key}
              connections={connections[o.key]}
              type={o.type}
              outputStore={outputDef.outputStore}
              output
              on:connection={({ detail }) => {
                // console.log(detail);
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
