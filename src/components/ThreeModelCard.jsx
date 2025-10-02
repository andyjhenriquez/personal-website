// src/components/ThreeModelCard.jsx
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import LoadingSpinner from "./LoadingSpinner.jsx";

export default function ThreeModelCard({
  modelUrl,
  title,
  rotateY = 0.2,
  distance = 2.4,
  pitchDeg = 15,
  spinnerSize = 36,
}) {
  const containerRef = useRef(null);
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const animRef = useRef(null);
  const modelGroupRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Scene
    const scene = new THREE.Scene();
    scene.background = null;
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 100);
    cameraRef.current = camera;

    // Position camera using distance and downward pitch
    const rad = (pitchDeg * Math.PI) / 180;
    const y = Math.sin(rad) * distance; // up component
    const z = Math.cos(rad) * distance; // forward distance
    camera.position.set(0, y, z);
    camera.lookAt(0, 0, 0);

    // Lights
    const amb = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(amb);
    const dir = new THREE.DirectionalLight(0xffffff, 0.9);
    dir.position.set(2, 3, 5);
    scene.add(dir);

    // Rotating container
    const modelGroup = new THREE.Group();
    scene.add(modelGroup);
    modelGroupRef.current = modelGroup;

    // Load model
    const loader = new GLTFLoader();
    let disposed = false;

    const finishLoadingSafely = () => {
      if (!disposed) setIsLoading(false);
    };

    const addFallback = () => {
      const geo = new THREE.BoxGeometry(1, 1, 1);
      const mat = new THREE.MeshStandardMaterial({ color: 0xffffff });
      const mesh = new THREE.Mesh(geo, mat);
      modelGroup.add(mesh);
      fitGroupToUnitBox(modelGroup, 1.2);
      finishLoadingSafely();
    };

    loader.load(
      modelUrl,
      (gltf) => {
        if (disposed) return;
        modelGroup.add(gltf.scene);
        fitGroupToUnitBox(modelGroup, 1.2);
        finishLoadingSafely();
      },
      undefined,
      () => {
        if (disposed) return;
        addFallback();
      }
    );

    // Fit helper
    function fitGroupToUnitBox(group, targetSize = 1.5) {
      const box = new THREE.Box3().setFromObject(group);
      const size = new THREE.Vector3();
      box.getSize(size);
      const maxDim = Math.max(size.x, size.y, size.z) || 1;
      const scale = targetSize / maxDim;
      group.scale.setScalar(scale);

      // Recenter
      const box2 = new THREE.Box3().setFromObject(group);
      const center = new THREE.Vector3();
      box2.getCenter(center);
      group.position.sub(center);
      // small bias to keep it visually centered
      group.position.y += 0.05;
    }

    // Animate
    const tick = () => {
      animRef.current = requestAnimationFrame(tick);
      if (modelGroup) modelGroup.rotation.y += (rotateY * Math.PI) / 180;
      renderer.render(scene, camera);
    };
    tick();

    // Resize
    const onResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    const ro = new ResizeObserver(onResize);
    ro.observe(container);

    return () => {
      disposed = true;
      ro.disconnect();
      cancelAnimationFrame(animRef.current);
      scene.traverse((obj) => {
        if (obj.isMesh) {
          obj.geometry?.dispose();
          if (obj.material?.isMaterial) {
            obj.material.map?.dispose?.();
            obj.material.dispose?.();
          }
        }
      });
      renderer.dispose();
      container.removeChild(renderer.domElement);
    };
  }, [modelUrl, rotateY, distance, pitchDeg]);

  return (
    <div className="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-4 md:p-5 shadow-soft">
      <div className="relative">
        {/* Canvas container */}
        <div
          ref={containerRef}
          className="aspect-square rounded-xl border border-neutral-800 overflow-hidden"
        />
        {/* Loading Spinner Overlay */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <LoadingSpinner size={spinnerSize} />
          </div>
        )}
      </div>

      {title ? (
        <div className="mt-4 text-center">
          <h3 className="text-lg font-medium">{title}</h3>
        </div>
      ) : null}
    </div>
  );
}
