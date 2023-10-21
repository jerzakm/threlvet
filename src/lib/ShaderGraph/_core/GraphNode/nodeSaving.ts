import { get } from "svelte/store";
import { activeMaterialDefinition, materialDefinition } from "../core";

// todo full rewrite, derived

const saveMaterials = () => {
  materialDefinition.set(get(materialDefinition));
};

export const makeNewConnection = (
  fromNode: string,
  fromAnchor: string,
  toNode: string,
  toAnchor: string
) => {
  console.log("making connection");

  const def = get(materialDefinition);
  const mIndex = get(activeMaterialDefinition) || 0;
  if (def) {
    if (!def[mIndex].nodes[fromNode].connections)
      def[mIndex].nodes[fromNode].connections = {};
    //@ts-ignore
    def[mIndex].nodes[fromNode].connections[fromAnchor] = [[toNode, toAnchor]];
  }
  saveMaterials();
};

export const deleteConnection = (fromNode: string, fromAnchor: string) => {
  const def = get(materialDefinition);
  const mIndex = get(activeMaterialDefinition) || 0;
  if (def) {
    if (!def[mIndex].nodes[fromNode].connections)
      def[mIndex].nodes[fromNode].connections = {};
    //@ts-ignore
    def[mIndex].nodes[fromNode].connections[fromAnchor] = [];
  }

  saveMaterials();
};

export const saveProcessingData = (nodeId: string, processingData: any) => {
  console.log(nodeId, processingData);
  const def = get(materialDefinition);
  const mIndex = get(activeMaterialDefinition) || 0;
  if (def) {
    if (!def[mIndex].nodes[nodeId].processingData)
      def[mIndex].nodes[nodeId].processingData = {};
    //@ts-ignore
    def[mIndex].nodes[nodeId].processingData = processingData;
  }

  saveMaterials();
};
