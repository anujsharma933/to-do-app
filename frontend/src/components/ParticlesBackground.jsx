import React, { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

export default function ParticlesBackground({ darkMode }) {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setInit(true));
  }, []);

  if (!init) return null;

  return (
    <Particles
      id="tsparticles"
      options={{
        background: { color: { value: "transparent" } },
        fpsLimit: 60,
        particles: {
          number: { value: 60 },
          color: { value: darkMode ? "#93c5fd" : "#6366f1" },
          links: {
            color: darkMode ? "#a5b4fc" : "#818cf8",
            distance: 130,
            enable: true,
            opacity: 0.4,
            width: 1,
          },
          move: { enable: true, speed: 1, outModes: { default: "bounce" } },
          size: { value: { min: 1, max: 4 } },
          opacity: { value: 0.6 },
        },
        detectRetina: true,
        interactivity: {
          events: {
            onHover: { enable: true, mode: "repulse" },
            resize: true,
          },
          modes: {
            repulse: { distance: 80, duration: 0.4 },
          },
        },
      }}
      className="absolute inset-0 -z-10"
    />
  );
}
