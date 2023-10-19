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
    material.colorNode = inputs.color;
    material.metalnessNode = inputs.metalness;

    material.needsUpdate = true;
    currentMaterial.set(material);
    return material;
  };

  const inputDef = inputBuilder()
    .add("color", "v4", vec4(1, 1, 1, 1))
    .add("metalness", "f", float(0))
    .procesor(procesor)
    .build();
</script>

<GraphNode title="StandardNodeMaterial" id="material" {inputDef} />
