import React from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

export default function ParticlesBackground({ darkMode }) {
  const particlesInit = async (main) => {
    await loadFull(main);
  };

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
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
