<script lang="ts">
  import { Anchor, generateInput, generateOutput, Node } from "svelvet";

  export let title: string;
  export let destroy: null | (() => void) = null;
</script>

<Node useDefaults {...$$restProps}>
  <div class="node flex flex-col gap-2 p-0 pb-2">
    <div class="header px-4 py-2">
      <span>{title}</span>
      {#if destroy}
        <button class="destroy" on:click={destroy}>X</button>
      {/if}
    </div>
    <div class="grid grid-cols-[2rem_1fr_2rem]">
      <div class="flex flex-col gap-1">
        <slot name="inputs" />
      </div>

      <slot name="body" />
      <slot name="output" />
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
