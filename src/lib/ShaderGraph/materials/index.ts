import StandardMaterialNode from "./StandardMaterialNode.svelte";

const materialMap = {
  StandardMaterialNode: StandardMaterialNode,
};

type MaterialTypeId = keyof typeof materialMap;

export { materialMap };
export type { MaterialTypeId };
