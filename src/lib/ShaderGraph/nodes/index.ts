import ColorNode from "./ColorNode.svelte";
import Float from "./Float.svelte";

type NodeCategory = "fixedValue" | "math" | "uniforms";

type NodeDefinition = {
  component: any;
  name: string;
  description?: string;
  category: NodeCategory;
  icon?: string;
};

const fixedValue = [
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
] as const;

const math = [] as const;
const uniforms = [] as const;

const groupDefinitions: {
  name: string;
  key: NodeCategory;
  icon?: string;
  description?: "";
}[] = [
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
] as const;

const nodeDefinitions = {
  fixedValue,
  math,
  uniforms,
};

export type NodeTypeId =
  (typeof nodeDefinitions)[keyof typeof nodeDefinitions][number]["name"];

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
