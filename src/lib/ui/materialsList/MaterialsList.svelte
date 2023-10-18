<script lang="ts">
  import type { TreeItem } from "./materialTree.svelte";
  import { createTreeView } from "@melt-ui/svelte";
  import { X } from "lucide-svelte";
  import { setContext } from "svelte";
  import Tree from "./materialTree.svelte";
  import NewMaterial from "./NewMaterial.svelte";

  export let open = false;

  const ctx = createTreeView({
    defaultExpanded: ["lib-0", "tree-0"],
  });
  setContext("material-tree", ctx);

  const {
    elements: { tree },
  } = ctx;

  const treeItems: TreeItem[] = [
    { name: "Starter material" },
    // {
    //   title: "lib",
    //   icon: "folder",
    //   children: [
    //     {
    //       title: "icons",
    //       icon: "folder",
    //       children: [
    //         { title: "JS.svelte", icon: "svelte" },
    //         { title: "Svelte.svelte", icon: "svelte" },
    //       ],
    //     },
    //     {
    //       title: "index.js",
    //       icon: "js",
    //     },
    //   ],
    // },
  ];
</script>

{#if open}
  <div class="flex flex-col rounded-lg p-2 bg-white/9sd0 shadow-md relative">
    <div>
      <NewMaterial />
      <button
        aria-label="close"
        class="absolute right-0 top-0 inline-flex h-6 w-6 appearance-none
              items-center justify-center rounded-full p-1
              hover:bg-orange-100/70 focus:shadow-orange-400"
        on:click={() => (open = false)}>
        <X class="square-4" />
      </button>
    </div>
    <ul class="overflow-auto w-full" {...$tree}>
      <Tree {treeItems} />
    </ul>
  </div>
{/if}
