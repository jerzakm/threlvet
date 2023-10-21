import ColorNode from "./ColorNode.svelte";
import Float from "./Float.svelte";
import UVNode from "./common/UVNode.svelte";
import Multiply from "./math/Multiply.svelte";
import Sin from "./math/Sin.svelte";
import TimeUniform from "./uniforms/TimeUniform.svelte";

type NodeCategory = "fixedValue" | "math" | "uniforms" | "threeCommons";

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

const math = [
  {
    component: Multiply,
    name: "Multiply",
    category: "math",
  },
  {
    component: Sin,
    name: "Sin",
    category: "math",
  },
] as const;

const uniforms = [
  {
    component: TimeUniform,
    name: "TimeUniform",
    category: "uniform",
  },
] as const;

const threeCommons = [
  {
    component: UVNode,
    name: "UVNode",
    category: "threeCommons",
  },
] as const;

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
    name: "Three commons",
    key: "threeCommons",
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
  threeCommons,
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
