import { writable } from "svelte/store";

export const matConfig = writable({
  material: "StandardNodeMaterial",
  nodes: {
    1: {
      type: "ColorNode",
      connections: {
        color: [["material", "color"]],
        r: [],
        g: [],
        b: [],
      },
    },
  },
});
