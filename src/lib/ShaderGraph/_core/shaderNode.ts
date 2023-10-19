export type NodeInOutType =
  | "f"
  | "v2"
  | "v3"
  | "v4"
  | "m3"
  | "m4"
  | "i"
  | "tex";

export type NodeInOut = { key: string; type: NodeInOutType; default: any }[];
