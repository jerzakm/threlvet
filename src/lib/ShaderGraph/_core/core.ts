import { writable } from "svelte/store";
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

export const materialDefinition = writable<any>();
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
