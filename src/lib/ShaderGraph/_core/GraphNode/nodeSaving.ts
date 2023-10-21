import { get } from "svelte/store";
import { activeMaterialDefinition, materialDefinition } from "../core";
import { uiStores } from "$lib/ui/uiStores";
import equal from "fast-deep-equal";

// todo full rewrite, derived
// use a Map for nodes instead of an object

const { shaderGraphNeedsRefresh } = uiStores;

const saveMaterials = () => {
  materialDefinition.set(get(materialDefinition));
};

export const makeNewConnection = (
  fromNode: string,
  fromAnchor: string,
  toNode: string,
  toAnchor: string
) => {
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
  shaderGraphNeedsRefresh.set(true);
  // setTimeout(() => {

  // }, 100);
};

export const saveProcessingData = (nodeId: string, processingData: any) => {
  const def = get(materialDefinition);
  const mIndex = get(activeMaterialDefinition) || 0;

  if (!def) return;
  if (!def[mIndex].nodes[nodeId]) return;

  const isEqual = equal(
    def[mIndex].nodes[nodeId].processingData,
    processingData
  );

  if (!isEqual) {
    def[mIndex].nodes[nodeId].processingData = processingData;
    saveMaterials();
  }
};

export const deleteNode = (nodeId: string) => {
  const def = get(materialDefinition);
  const mIndex = get(activeMaterialDefinition) || 0;
  if (def) {
    console.log({ mIndex, nodeId });
    delete def[mIndex].nodes[nodeId];
  }
  shaderGraphNeedsRefresh.set(true);
  saveMaterials();
};
