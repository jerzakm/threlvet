<script lang="ts">
  import { GraphNode } from "../_core/GraphNode";

  import {
    MeshStandardNodeMaterial,
    float,
    vec4,
  } from "three/examples/jsm/nodes/Nodes";
  import { inputBuilder } from "../_core/GraphNode/inOutBuilder";
  import { currentMaterial } from "../_core/core";

  const material = new MeshStandardNodeMaterial({});
  const procesor = (inputs: any) => {
    if (inputs.color) material.colorNode = inputs.color;
    material.metalnessNode = float(1);
    material.needsUpdate = true;
    currentMaterial.set(material);
    return material;
  };

  const inputDef = inputBuilder()
    .add("color", "v4", vec4(1, 1, 1, 1))
    .procesor(procesor)
    .build();
</script>

<GraphNode title="StandardNodeMaterial" id="material" {inputDef} />
