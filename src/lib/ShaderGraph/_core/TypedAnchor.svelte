<script lang="ts">
  import type { ComponentProps } from "svelte";
  import { Anchor } from "svelvet";
  import type { NodeInOutType } from "./core";

  type $$Props = ComponentProps<Anchor> & { type: NodeInOutType };

  export let type: NodeInOutType;
</script>

<Anchor {...$$restProps} let:linked on:connection on:disconnection>
  <div
    class={`flex gap-1 font-mono items-center ${
      $$restProps.output ? "flex-row-reverse" : ""
    }`}>
    <div
      class={`border border-black rounded-md flex items-center justify-center w-5 h-5 ${
        linked ? "bg-orange-400/80" : ""
      }`}>
      <span class="uppercase text-xs">{type}</span>
    </div>
    <span class="px-1">{$$restProps.key}</span>
  </div>
</Anchor>
