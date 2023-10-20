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

const fixedValue: NodeDefinition[] = [
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

const groupDefinitions = [
  {
    name: "Fixed values",
    key: "fixedValue",
    icon: "",
    description: "",
  },
  {
    name: "Math",
    key: "math",
    icon: "",
    description: "",
  },
  {
    name: "Uniforms",
    key: "uniforms",
    icon: "",
    description: "",
  },
];

const nodeDefinitions = {
  fixedValue,
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

export { nodeDefinitions, nodeMap, groupDefinitions };
