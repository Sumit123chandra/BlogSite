"use client";

import dynamic from "next/dynamic";

// Dynamically import your ParticlesBackground component client-side
const ParticlesBackground = dynamic(
  () => import("@/components/ParticlesBackground"),
  { ssr: false }
);

export default function ParticlesWrapper() {
  return <ParticlesBackground />;
}
