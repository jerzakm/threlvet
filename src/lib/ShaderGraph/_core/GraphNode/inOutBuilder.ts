import { generateInput, generateOutput } from "svelvet";
import type { NodeInOutType } from "../core";

type InputAnchorDef = { key: string; type: NodeInOutType; default: any };

export type ShaderNodeInputDefinition = {
  inputs: InputAnchorDef[];
  procesor: Function;
};

class InputBuilder {
  private inputs: ShaderNodeInputDefinition["inputs"] = [];
  private _procesor: Function = () => {};

  add = (key: string, type: NodeInOutType, _default: any) => {
    this.inputs.push({ key, type, default: _default });
    return this;
  };

  procesor = (f: Function) => {
    this._procesor = f;
    return this;
  };

  build = (): ShaderNodeInputDefinition => {
    return { inputs: this.inputs, procesor: this._procesor };
  };
}

export const inputBuilder = () => {
  const ib = new InputBuilder();
  return ib;
};

export type ShaderNodeOutputDefinition = {
  outputs: InputAnchorDef[];
  procesor: Function;
  processingStore: ReturnType<typeof generateInput>;
  outputStore: ReturnType<typeof generateOutput>;
};

class OutputBuilder {
  private inputs: ShaderNodeOutputDefinition["outputs"] = [];
  private _procesor: Function = () => {};
  private processingData: Record<string, string | number | boolean | object> =
    {};

  add = (key: string, type: NodeInOutType, _default: any) => {
    this.inputs.push({ key, type, default: _default });
    return this;
  };

  processingDataDependency = (processingDataDependency: any) => {
    this.processingData = processingDataDependency;
    return this;
  };

  procesor = (f: Function) => {
    if (!this.processingData) this.processingData = {};
    this._procesor = f;
    return this;
  };

  build = (): ShaderNodeOutputDefinition => {
    const processingStore = generateInput(this.processingData);
    //@ts-ignore
    const outputStore = generateOutput(processingStore, this._procesor);
    return {
      outputs: this.inputs,
      procesor: this._procesor,
      outputStore,
      processingStore,
    };
  };
}

export const outputBuilder = () => {
  const ob = new OutputBuilder();
  return ob;
};
