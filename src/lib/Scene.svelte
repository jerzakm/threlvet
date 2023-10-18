<script lang="ts">
  import { T, useThrelte, useFrame } from "@threlte/core";
  import { currentMaterial } from "./materialStore";
  // import {
  //   MeshPhysicalNodeMaterial,
  //   vec4,
  // } from "three/examples/jsm/nodes/Nodes";

  // const material = new MeshPhysicalNodeMaterial({});
  // material.colorNode = vec4(1, 0.5, 1, 1);

  // useFrame(() => {
  //   nodeFrame.update();
  // });
</script>

<T.Mesh>
  <T.SphereGeometry args={[2]} />
  <!-- <T is={material} /> -->
  {#if $currentMaterial}
    <T is={$currentMaterial} />
  {/if}
</T.Mesh>

<!-- <T.AmbientLight /> -->
<T.DirectionalLight position.x={-5} position.y={5} position.z={5} />
