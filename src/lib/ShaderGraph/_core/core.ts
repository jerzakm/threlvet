import { writable } from "svelte/store";
import type { NodeTypeId } from "../nodes";
import type { MaterialTypeId } from "../materials";
export type NodeInOutType =
  | "f"
  | "v2"
  | "v3"
  | "v4"
  | "m3"
  | "m4"
  | "i"
  | "tex";

export const currentMaterial = writable<any>(undefined);

type NodeDefinition = {
  type: NodeTypeId;
  connections?: Record<string, any[]>;
  position: { x: number; y: number };
  processingData?: Record<string, any>;
};

type MaterialDefinition = {
  name: string;
  material: MaterialTypeId;
  nodes: Record<string, NodeDefinition>;
};

export const activeMaterialDefinition = writable<number | undefined>(undefined);

export const materialDefinition = writable<MaterialDefinition[] | undefined>(
  undefined
);

export const newNode = writable<NodeTypeId | undefined>(undefined);

//   {
//   material: "StandardNodeMaterial",
//   nodes: {
//     1: {
//       type: "ColorNode",
//       connections: {
//         color: [["material", "color"]],
//         r: [],
//         g: [],
//         b: [],
//       },
//       position: {
//         x: 200,
//         y: 300,
//       },
//       processingData: {
//         color: "#FF33AA",
//       },
//     },
//     2: {
//       type: "Float",
//       connections: {
//         float: [["material", "metalness"]],
//       },
//       position: {
//         x: 300,
//         y: 600,
//       },
//       processingData: {
//         float: 0.5,
//       },
//     },
//   },
// }
