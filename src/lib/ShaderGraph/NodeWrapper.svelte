<script lang="ts">
  import { Anchor, generateInput, generateOutput, Node } from "svelvet";

  export let title: string;
  export let inputsStore: ReturnType<typeof generateInput> | null = null;
  export let outputStore: ReturnType<typeof generateOutput> | null = null;
  export let key = "";
  export let destroy: null | (() => void) = null;
</script>

<Node useDefaults position={{ x: 700, y: 400 }} id="material">
  <div class="node flex flex-col gap-2 p-0 pb-2">
    <div class="header px-4 py-2">
      <span>{title}</span>
      {#if destroy}
        <button class="destroy" on:click={destroy}>X</button>
      {/if}
    </div>
    <div class="grid grid-cols-[2rem_1fr_2rem]">
      {#if inputsStore}
        <Anchor
          id="color"
          let:connecting
          let:linked
          key="color"
          input
          connections={[["color", "color"]]}
          {inputsStore} />

        <span>color</span>
        <!-- <div class="output-anchors flex items-end">
          <Anchor
            id={key}
            let:linked
            let:connecting
            let:hovering
            {outputStore}
            input />
        </div> -->
      {/if}
      <slot />
      {#if outputStore}
        <div class="output-anchors flex items-end">
          <Anchor
            id={key}
            connections={[["output", key]]}
            let:linked
            let:connecting
            let:hovering
            {outputStore}
            output />
        </div>
      {/if}
    </div>
  </div>
</Node>

<style>
  .node {
    box-sizing: border-box;
    width: fit-content;
    height: fit-content;
    position: relative;
    pointer-events: auto;
  }

  .output-anchors {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .destroy {
    background: none;
    border: none;
    color: inherit;
    cursor: pointer;
  }
  .header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    width: 100%;
    border-bottom: solid 1px;
    border-color: lightgray;
  }
</style>
