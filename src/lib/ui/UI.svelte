<script lang="ts">
  import MaterialsList from "./materialsList/MaterialsList.svelte";
  import { Layers3, Component } from "lucide-svelte";

  let openMenu = {
    materials: false,
    resources: false,
  };

  const open = (menu: keyof typeof openMenu) => {
    Object.keys(openMenu).map((k) => (openMenu[k] = false));
    openMenu[menu] = true;
  };
</script>

<div class="flex flex-col">
  <div class="w-full p-2 flex gap-2 items-center">
    <img src="/threlte-logo-icon-only.png" class="h-8" />
    <span class="font-bold">Threlte material maker</span>
  </div>
  <div class="flex p-2 gap-4">
    <div class="flex flex-col text-sm gap-2">
      <button
        class="flex flex-col items-center border rounded-lg p-2 bg-white/40 shadow-md"
        on:click={() => open("materials")}>
        <Component size={36} strokeWidth={1.2} />
        materials
      </button>
      <button
        class="flex flex-col items-center border rounded-lg p-2 bg-white/40 shadow-md"
        on:click={() => open("resources")}>
        <Layers3 size={36} strokeWidth={1.2} />
        resources
      </button>
    </div>
    <MaterialsList bind:open={openMenu.materials} />
  </div>
</div>
