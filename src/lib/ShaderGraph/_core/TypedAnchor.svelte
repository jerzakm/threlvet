<script lang="ts">
  import type { ComponentProps } from "svelte";
  import { Anchor } from "svelvet";
  import type { NodeInOutType } from "./shaderNode";

  type $$Props = ComponentProps<Anchor>;

  export let type: NodeInOutType;
  //
</script>

<Anchor {...$$restProps} let:linked>
  <div
    class={`border border-black rounded-md flex items-center justify-center w-5 h-5 ${
      linked ? "bg-orange-400/80" : ""
    }`}>
    <span class="text-xs font-mono uppercase">{type}</span>
  </div>
</Anchor>
