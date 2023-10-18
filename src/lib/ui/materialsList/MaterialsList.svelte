<script lang="ts">
  import { createTreeView } from "@melt-ui/svelte";
  import { setContext } from "svelte";

  import type { TreeItem } from "./materialTree.svelte";
  import Tree from "./materialTree.svelte";

  const ctx = createTreeView({
    defaultExpanded: ["lib-0", "tree-0"],
  });
  setContext("material-tree", ctx);

  const {
    elements: { tree },
  } = ctx;

  const treeItems: TreeItem[] = [
    { title: "Starter material" },
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

<div class="flex flex-col bg-blue-900 border-blue border rounded-md">
  <ul class="overflow-auto px-4 pb-4 pt-2" {...$tree}>
    <Tree {treeItems} />
  </ul>
</div>
