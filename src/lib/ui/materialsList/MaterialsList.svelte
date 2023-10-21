<script lang="ts">
  import type { TreeItem } from "./materialTree.svelte";
  import { createTreeView } from "@melt-ui/svelte";
  import { Sparkles, X } from "lucide-svelte";
  import { setContext } from "svelte";
  import Tree from "./materialTree.svelte";
  import NewMaterial from "./NewMaterial.svelte";

  export let open = false;

  const ctx = createTreeView({
    defaultExpanded: [],
  });
  setContext("material-tree", ctx);

  const {
    elements: { tree },
    states: { selectedItem },
  } = ctx;

  let treeItems: TreeItem[] = [];

  import {
    activeMaterialDefinition,
    materialDefinition,
  } from "$lib/ShaderGraph/_core/core";

  $: {
    if (Array.isArray($materialDefinition)) {
      treeItems = $materialDefinition.map((m, i) => {
        return {
          name: m.name,
          materialIndex: i,
        };
      });
    }
  }
</script>

{#if open}
  <div
    class="flex flex-col rounded-lg p-2 bg-black/40 shadow-md relative border border-white/40 items-center">
    <div>
      <NewMaterial />
      <button
        aria-label="close"
        class="absolute -right-6 -top-6 inline-flex h-6 w-6 appearance-none
              items-center justify-center rounded-full p-1
              hover:bg-orange-100/70 focus:shadow-orange-400"
        on:click={() => (open = false)}>
        <X class="square-4" />
      </button>
    </div>
    <ul class="overflow-auto w-full pt-4 flex flex-col gap-1" {...$tree}>
      {#if Array.isArray($materialDefinition)}
        {#each $materialDefinition as material, index}
          <li>
            <button
              class={`text-xs flex gap-1 items-center px-1 py-0 border border-white/20 w-full ${
                $activeMaterialDefinition === index ? "bg-orange/60" : ""
              }`}
              on:click={() => {
                activeMaterialDefinition.set(index);
              }}>
              <Sparkles class="w-4" />
              <span>{material.name}</span>
            </button>
          </li>
        {/each}
      {/if}
    </ul>
  </div>
{/if}
