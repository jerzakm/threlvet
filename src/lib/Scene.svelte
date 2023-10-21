<script lang="ts">
  import { T, useThrelte, useFrame } from "@threlte/core";
  import { currentMaterial } from "./ShaderGraph/_core/core";
  import { OrbitControls } from "@threlte/extras";
  import { DEG2RAD } from "three/src/math/MathUtils";
  import { DoubleSide } from "three";
</script>

<T.PerspectiveCamera
  makeDefault
  fov={50}
  position.x={-5}
  position.y={5}
  position.z={-5}>
  <OrbitControls enableDamping autoRotate autoRotateSpeed={0.3} />
</T.PerspectiveCamera>

<T.Mesh position.y={1}>
  <T.SphereGeometry args={[2]} />
  <!-- <T.PlaneGeometry args={[3, 3]} /> -->
  <!-- <T.BoxGeometry args={[3, 3, 3]} /> -->
  <!-- <T.MeshBasicMaterial color="red" /> -->
  {#if $currentMaterial}
    <T is={$currentMaterial} />
  {/if}
</T.Mesh>

<!-- <T.AmbientLight intensity={0.1} /> -->
<T.DirectionalLight
  position.x={15}
  position.y={15}
  position.z={-15}
  intensity={1.5} />
