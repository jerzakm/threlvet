<script lang="ts">
  import { useFrame, useRender, useThrelte } from "@threlte/core";
  import { nodeFrame } from "three/examples/jsm/renderers/webgl-legacy/nodes/WebGLNodes.js";

  const { scene, camera, renderer } = useThrelte();

  useFrame(() => {
    nodeFrame.update();
  });

  useRender(() => {
    renderer.render(scene, $camera);
  });
</script>
