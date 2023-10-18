<script lang="ts">
  import { T, useThrelte, useFrame } from "@threlte/core";
  import {
    MeshPhysicalNodeMaterial,
    vec4,
  } from "three/examples/jsm/nodes/Nodes";

  const material = new MeshPhysicalNodeMaterial({});
  material.colorNode = vec4(1, 0.5, 1, 1);

  // useFrame(() => {
  //   nodeFrame.update();
  // });
</script>

<T.Mesh>
  <T.SphereGeometry />
  <T is={material} />
</T.Mesh>

<T.AmbientLight />
<T.DirectionalLight />
