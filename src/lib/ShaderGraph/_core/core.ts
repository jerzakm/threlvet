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

export type NewNode = {
  id: string;
  type: NodeTypeId;
};

export const newNode = writable<NewNode | undefined>(undefined);
