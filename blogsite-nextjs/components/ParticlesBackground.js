"use client";
import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

export default function ParticlesBackground() {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <div className="absolute inset-0 -z-10">
      <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        fullScreen: { enable: true, zIndex: -1 },
        background: {
          color: {
            value: "#0f172a", // Tailwind's slate-900 or a custom dark blue
          },
        },
        particles: {
          number: { value: 50 },
          color: { value: "#38bdf8" }, // Tailwind's sky-400 (light neon blue)
          shape: { type: "circle" },
          opacity: {
            value: 0.8,
            random: true,
            anim: {
              enable: true,
              speed: 1,
              opacity_min: 0.2,
              sync: false,
            },
          },
          size: {
            value: { min: 1, max: 4 },
            random: true,
          },
          links: {
            enable: true,
            distance: 120,
            color: "#0ea5e9", // Tailwind's sky-500
            opacity: 0.4,
            width: 1,
          },
          move: {
            enable: true,
            speed: 1.2,
            direction: "none",
            random: false,
            straight: false,
            outModes: { default: "bounce" },
            attract: { enable: false },
          },
        },
        detectRetina: true,
      }}
    />
    </div>
  );
}
