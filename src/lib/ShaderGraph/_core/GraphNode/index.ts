import NodeInputWrapper from "./NodeInputWrapper.svelte";
import NodeOutputWrapper from "./NodeOutputWrapper.svelte";
import NodeWrapper from "./NodeWrapper.svelte";

// export type NodeInOut = { key: string; type: NodeInOutType; default: any }[];

export {
  NodeInputWrapper as Inputs,
  NodeOutputWrapper as Outputs,
  NodeWrapper as GraphNode,
};
