<script lang="ts">
  import { nodeDefinitions, groupDefinitions } from "$lib/ShaderGraph/nodes";
</script>

<div class=" w-full fixed bottom-0 flex items-center justify-center py-4 gap-1">
  {#each groupDefinitions as group, i}
    <button
      class="h-20 w-20 border relative flex items-center flex-col bg-black/40 rounded-lg justify-center text-white hover:bg-white/10 duration-100 p-1 text-sm">
      <span class="absolute -top-6">[ {i + 1} ]</span>
      <span class="text-center font-mono">
        {group.name}
      </span>
    </button>
  {/each}
</div>
