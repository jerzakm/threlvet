import ColorNode from "./ColorNode.svelte";
import Float from "./Float.svelte";

type NodeCategory = "fixedValue" | "math";

type NodeDefinition = {
  component: any;
  name: string;
  description?: string;
  category: NodeCategory;
  icon?: string;
};

const fixedValueNodes: NodeDefinition[] = [
  {
    component: Float,
    name: "Float",
    category: "fixedValue",
  },
  {
    component: ColorNode,
    name: "ColorNode",
    category: "fixedValue",
  },
];

const nodeDefinitions = {
  fixedValue: fixedValueNodes,
};

const nodeMap: Record<string, any> = [...Object.values(nodeDefinitions)].reduce(
  (map: any, nodesGroup) => {
    nodesGroup.map((node) => {
      map[node.name] = node.component;
    });

    return map;
  },
  {}
);

export { nodeDefinitions, nodeMap };
