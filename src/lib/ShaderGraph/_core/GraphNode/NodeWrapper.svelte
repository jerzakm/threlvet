<script lang="ts">
  import { generateInput, generateOutput, Node } from "svelvet";
  import { Inputs } from ".";
  import TypedAnchor from "../TypedAnchor.svelte";

  export let title: string;

  export let inputDef: any | undefined = undefined;

  $: initialData =
    inputDef &&
    inputDef.inputs &&
    inputDef.inputs.map((input) => {
      const key = input.key;
      return { [key]: input.default };
    });

  $: inputs = generateInput(initialData);

  $: output = inputDef && inputs && generateOutput(inputs, inputDef.procesor);

  export let destroy: null | (() => void) = null;
</script>

<Node
  useDefaults
  {...$$restProps}
  on:connection={(e) => {
    console.log("connection stuff");
  }}>
  <div class="node flex flex-col gap-2 p-0 pb-2">
    <div class="header px-4 py-2">
      <span>{title}</span>
      {#if destroy}
        <button class="destroy" on:click={destroy}>X</button>
      {/if}
    </div>
    <div class="grid grid-cols-[2rem_1fr_2rem]">
      <div class="flex flex-col gap-1">
        {#if inputDef && output}
          <Inputs>
            {#each inputDef.inputs as i}
              <TypedAnchor
                id="color"
                key={i.key}
                input
                inputsStore={inputs}
                type={i.type}
                on:disconnection={(e) => {
                  console.log(i.type, e);
                }} />
            {/each}
          </Inputs>
        {/if}
      </div>

      <slot name="body" />
      <slot name="output" />
    </div>
  </div>
</Node>

<style>
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
