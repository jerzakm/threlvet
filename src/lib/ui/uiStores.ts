import { writable } from "svelte/store";

export const uiStores = {
  shaderGraphOpen: writable(true),
  shaderGraphNeedsRefresh: writable(false),
  needNewMaterial: writable(false),
};
