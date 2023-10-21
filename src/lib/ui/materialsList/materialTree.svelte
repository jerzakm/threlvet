<script context="module" lang="ts">
  import { Folder, FolderOpen, Sparkles } from "lucide-svelte";

  type Icon = "folder";

  export type TreeItem = {
    name: string;
    icon?: Icon;
    materialIndex: number;
    children?: TreeItem[];
  };

  export const icons = {
    folder: Folder,
    folderOpen: FolderOpen,
  };
</script>

<script lang="ts">
  import { melt, type TreeView } from "@melt-ui/svelte";
  import { getContext } from "svelte";

  export let treeItems: TreeItem[];
  export let level = 1;

  const {
    elements: { item, group },
    helpers: { isExpanded, isSelected },
  } = getContext<TreeView>("material-tree");
</script>

{#each treeItems as { name: title, icon, children }, i}
  {@const itemId = `${title}-${i}`}
  {@const hasChildren = !!children?.length}

  <li class={level !== 1 ? "pl-4" : ""}>
    <button
      class={`flex items-center gap-1 p-1   ${
        $isSelected(itemId) ? "bg-blue-500/30" : ""
      }`}
      use:melt={$item({
        id: itemId,
        hasChildren,
      })}>
      <!-- Add icon. -->
      {#if icon === "folder" && hasChildren && $isExpanded(itemId)}
        <svelte:component this={icons["folderOpen"]} class="h-4 w-4" />
      {:else}
        <div class="h-5 w-5 flex flex-col items-center justify-center">
          <Sparkles class="w-5 h-5" />
        </div>
      {/if}

      <span class="select-none text-xs -mt-1">{title}</span>
    </button>

    {#if children}
      <ul use:melt={$group({ id: itemId })}>
        <svelte:self treeItems={children} level={level + 1} />
      </ul>
    {/if}
  </li>
{/each}

<style>
  /* Remove docs' focus box-shadow styling. */
  li:focus {
    box-shadow: none !important;
  }
</style>
