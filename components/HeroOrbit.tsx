"use client";

import { Canvas } from "@react-three/fiber";
import { Float, MeshDistortMaterial, OrbitControls } from "@react-three/drei";

function Orb() {
  return (
    <Float speed={1.4} rotationIntensity={1.2} floatIntensity={2}>
      <mesh>
        <icosahedronGeometry args={[1.25, 1]} />
        <MeshDistortMaterial
          color="#38bdf8"
          emissive="#8b5cf6"
          emissiveIntensity={0.5}
          distort={0.35}
          speed={2.2}
          roughness={0.1}
          metalness={0.5}
        />
      </mesh>
    </Float>
  );
}

export default function HeroOrbit() {
  return (
    <div className="h-[320px] w-full overflow-hidden rounded-[2rem] border border-border/80 bg-slate-950/70 shadow-2xl">
      <Canvas camera={{ position: [0, 0, 4.4], fov: 40 }}>
        <ambientLight intensity={1.2} />
        <directionalLight position={[4, 4, 4]} intensity={1.5} color="#7dd3fc" />
        <directionalLight position={[-4, -2, -1]} intensity={1.2} color="#c4b5fd" />
        <Orb />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.9} />
      </Canvas>
    </div>
  );
}
