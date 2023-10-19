import type { NodeInOutType } from "../shaderNode";

type InputAnchorDef = { key: string; type: NodeInOutType; default: any };

type ShaderNodeInputDefinition = {
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

type ShaderNodeOutputDefinition = {
  inputs: InputAnchorDef[];
  procesor: Function;
};

class OutputBuilder {
  private inputs: ShaderNodeOutputDefinition["inputs"] = [];
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

export const outputBuilder = () => {
  const ob = new OutputBuilder();
  return ob;
};
