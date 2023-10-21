<script lang="ts">
  import { createDialog, melt, createRadioGroup } from "@melt-ui/svelte";
  import { X } from "lucide-svelte";
  import { fade } from "svelte/transition";
  import { uiStores } from "../uiStores";
  import type { MaterialTypeId } from "$lib/ShaderGraph/materials";
  import { materialDefinition } from "$lib/ShaderGraph/_core/core";
  import {
    uniqueNamesGenerator,
    adjectives,
    colors,
    animals,
  } from "unique-names-generator";

  const {
    elements: {
      trigger,
      overlay,
      content,
      title,
      description,
      close,
      portalled,
    },
    states: { open },
  } = createDialog({
    forceVisible: false,
  });

  const {
    elements: { root, item, hiddenInput },
    helpers: { isChecked },
    states,
  } = createRadioGroup({
    defaultValue: "StandardMaterialNode",
  });

  const optionsArr: MaterialTypeId[] = ["StandardMaterialNode"];

  let materialName = uniqueNamesGenerator({
    dictionaries: [adjectives, animals],
    separator: "-",
  });

  $: $open &&
    (materialName = uniqueNamesGenerator({
      dictionaries: [adjectives, animals],
      separator: "-",
    }));
  const { value } = states;

  // todo move out adding logic and make it better
  const createNewMaterial = () => {
    if (!Array.isArray($materialDefinition)) materialDefinition.set([]);

    const material = {
      name: materialName,
      material: $value as MaterialTypeId,
      nodes: {},
    };

    $materialDefinition?.push(material);
    materialDefinition.set($materialDefinition);
  };

  const { needNewMaterial } = uiStores;

  $: {
    if ($needNewMaterial) {
      open.set(true);
    }
  }
</script>

<button
  use:melt={$trigger}
  class="inline-flex items-center justify-center bg-orange-400/90 text-white px-2 py-1 text-sm
   leading-none shadow hover:opacity-75">
  New material
</button>

<div use:melt={$portalled}>
  {#if $open}
    <div
      use:melt={$overlay}
      class="fixed inset-0 z-50 bg-black/50"
      transition:fade={{ duration: 150 }} />
    <div
      class="fixed left-[50%] top-[50%] z-50 max-h-[85vh] w-[90vw]
            max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-xl bg-black/70
            p-6 shadow-lg text-white"
      use:melt={$content}>
      <h2 use:melt={$title} class="m-0 text-lg font-bold text-orange">
        Create a new material
      </h2>

      <fieldset class="mb-4 flex flex-col w-full mt-6">
        <label class=" text-orange/80" for="name"> Name </label>
        <input
          class="inline-flex h-8 w-full flex-1 items-center justify-center
                    rounded-sm border border-solid px-3 leading-none text-white bg-white/10"
          id="name"
          bind:value={materialName} />
      </fieldset>

      <p use:melt={$description} class="mb-5 mt-2 leading-normal text-white/80">
        Pick one of the following base materials
      </p>

      <div
        use:melt={$root}
        class="flex flex-col gap-2 data-[orientation=horizontal]:flex-row"
        aria-label="View density">
        {#each optionsArr as option}
          <div
            class={`flex items-center gap-3  ${
              $isChecked(option)
                ? "bg-orange-400/20 border border-orange-400"
                : ""
            }`}>
            <button
              use:melt={$item(option)}
              id={option}
              aria-labelledby="{option}-label" />
            <label
              class="font-medium capitalize leading-none w-full py-3"
              for={option}
              id="{option}-label">
              {option}
            </label>
          </div>
        {/each}
        <input name="line-height" use:melt={$hiddenInput} />
      </div>

      <div class="mt-6 flex justify-end gap-4">
        <button
          use:melt={$close}
          class="inline-flex h-8 items-center justify-center rounded-sm
                    bg-zinc-100 px-4 font-medium leading-none text-zinc-600">
          Cancel
        </button>
        <button
          use:melt={$close}
          class="inline-flex h-8 items-center justify-center rounded-sm
                    bg-orange-400 px-4 font-medium leading-none text-white"
          on:click={createNewMaterial}>
          Create
        </button>
      </div>
      <button
        use:melt={$close}
        aria-label="close"
        class="absolute right-4 top-4 inline-flex h-6 w-6 appearance-none
                items-center justify-center rounded-full p-1
                ">
        <X class="square-4" />
      </button>
    </div>
  {/if}
</div>
