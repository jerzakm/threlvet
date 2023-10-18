<script lang="ts">
  import { createDialog, melt, createRadioGroup } from "@melt-ui/svelte";
  import { X } from "lucide-svelte";
  import { fade } from "svelte/transition";

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
  } = createRadioGroup({
    defaultValue: "nodeStandardMaterial",
  });

  const optionsArr = ["nodeStandardMaterial"];

  const createNewMaterial = () => {
    console.log("creating new material..");
  };
</script>

<button
  use:melt={$trigger}
  class="inline-flex items-center justify-center rounded-md border bg-orange-400/90 text-white px-2 py-2
  font-medium leading-none shadow hover:opacity-75">
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
            max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-xl bg-white
            p-6 shadow-lg"
      use:melt={$content}>
      <h2 use:melt={$title} class="m-0 text-lg font-medium text-black">
        Create a new material
      </h2>

      <fieldset class="mb-4 flex flex-col w-full mt-6">
        <label class="-mb-1 text-black/80" for="name"> Name </label>
        <input
          class="inline-flex h-8 w-full flex-1 items-center justify-center
                    rounded-sm border border-solid px-3 leading-none text-black"
          id="name"
          value="Your material name" />
      </fieldset>

      <p use:melt={$description} class="mb-5 mt-2 leading-normal text-zinc-600">
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
