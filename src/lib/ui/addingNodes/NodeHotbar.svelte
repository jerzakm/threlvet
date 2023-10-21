<script lang="ts">
  import { nodeDefinitions, groupDefinitions } from "$lib/ShaderGraph/nodes";
  import { uiStores } from "../uiStores";

  const { shaderGraphOpen } = uiStores;

  const nodeKeysOrder = [
    "q",
    "w",
    "e",
    "a",
    "s",
    "d",
    "r",
    "f",
    "z",
    "x",
    "c",
    "t",
    "g",
    "v",
    "b",
  ];

  const groupKeys = [...Array(groupDefinitions.length).keys()];

  let currentlyOpen: number | undefined = undefined;

  const keyDown = ({ key }: KeyboardEvent) => {
    if ($shaderGraphOpen) {
      // GROUP
      //      - open
      const int = parseInt(key);
      if (groupKeys.includes(int - 1))
        if (currentlyOpen == int - 1) {
          currentlyOpen = undefined;
        } else {
          currentlyOpen = int - 1;
        }
      //      - close
      if (key == "Escape") currentlyOpen = undefined;
      // NODE
      //      - pick a node if group is open
      if (currentlyOpen !== undefined && nodeKeysOrder.includes(key)) {
        const openGroup = groupDefinitions[currentlyOpen];
        const groupNodes = nodeDefinitions[openGroup.key];
        const nodeIndex = nodeKeysOrder.findIndex((v) => {
          return v == key;
        });
        const pickedNode = nodeDefinitions[openGroup.key][nodeIndex];
        currentlyOpen = undefined;
        //    - node picked. Add it to graph somehow
        if (pickedNode) {
          //
        }
      }
    }
  };
</script>

<svelte:window on:keydown={keyDown} />

<div
  class=" w-full fixed bottom-0 flex items-center justify-center py-4 gap-1 select-none flex-col">
  {#if currentlyOpen !== undefined}
    {@const openGroup = groupDefinitions[currentlyOpen]}
    {@const groupNodes = nodeDefinitions[openGroup.key]}

    <div class=" grid grid-cols-5 gap-1">
      {#each groupNodes as node, i}
        <button
          class={`relative backdrop-blur-sm h-20 w-20 border  flex items-center flex-col rounded-lg justify-center text-white hover:bg-white/10 duration-100 p-1 text-sm ${
            true ? "bg-black/90 text-orange-300" : "bg-black/60"
          }`}>
          <span class="absolute top-1 left-2"> {nodeKeysOrder[i]} </span>
          <span class="text-center font-mono pt-2">
            {node.name}
          </span>
        </button>
      {/each}
    </div>
  {/if}
  <div class="flex gap-1">
    {#each groupDefinitions as group, i}
      {@const isOpen = i == currentlyOpen}
      <div class="relative">
        <button
          class={`relative backdrop-blur-sm h-20 w-20 border  flex items-center flex-col rounded-lg justify-center text-white hover:bg-white/10 duration-100 p-1 text-sm ${
            isOpen ? "bg-black/90 text-orange-300" : "bg-black/60"
          }`}>
          <span class="absolute top-1 left-2"> {i + 1} </span>
          <span class="text-center font-mono pt-2">
            {group.name}
          </span>
        </button>
      </div>
    {/each}
  </div>
</div>
