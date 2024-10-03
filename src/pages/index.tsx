import { useEffect, useRef } from "react";
import * as THREE from "three";

import styles from "@/styles/Home.module.css";
import KeyMovementHandler from "@/game/logic/KeyMovementHandler";

function resizeRendererToDisplaySize(renderer: THREE.WebGLRenderer) {
  const canvas = renderer.domElement;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  const needResize = canvas.width !== width || canvas.height !== height;
  if (needResize) {
    renderer.setSize(width, height, false);
  }
  return needResize;
}

function ImperativeCode(root: HTMLDivElement, canvas: HTMLCanvasElement) {
  const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });
  const fov = 75;
  const aspect = canvas.clientWidth / canvas.clientHeight;
  const far = 500;
  const near = 0.1;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.z = 2;
  const scene = new THREE.Scene();

  const geometry = new THREE.BoxGeometry();
  const material = new THREE.MeshPhongMaterial({ color: 0x44aa88 });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  const kmh = new KeyMovementHandler();

  const color = 0xffffff;
  const intensity = 3;
  const light = new THREE.DirectionalLight(color, intensity);
  light.position.set(-1, 2, 4);
  scene.add(light);

  let oldTime: number | undefined = undefined;

  function render(time: number) {
    cube.rotation.x = time * 0.001;
    cube.rotation.y = time * 0.001;
    const deltaTime = time - (oldTime ?? time);
    oldTime = time;

    if (resizeRendererToDisplaySize(renderer)) {
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }
    renderer.render(scene, camera);
    const { left, right, up, down } = kmh.getMovementState();

    const movementChange = deltaTime * 0.01;
    if (left) {
      camera.translateX(-movementChange);
    }
    if (right) {
      camera.translateX(movementChange);
    }
    if (down) {
      camera.translateZ(movementChange);
    }
    if (up) {
      camera.translateZ(-movementChange);
    }
  }
  renderer.setAnimationLoop(render);
}

export default function Home() {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  console.log("rendered");
  useEffect(() => {
    if (canvasRef && rootRef) {
      ImperativeCode(rootRef.current!, canvasRef.current!);
    }
  }, [canvasRef, rootRef]);

  return (
    <div className={styles.page} ref={rootRef}>
      <canvas ref={canvasRef} className={styles.canvas}></canvas>
    </div>
  );
}
