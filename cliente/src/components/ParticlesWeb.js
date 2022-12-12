import React from "react";
import { tsParticles } from "tsparticles-engine";

const ParticlesWeb = () => {
  return tsParticles
    .loadJSON("tsparticles", "presets/default.json")
    .then((container) => {
      console.log("callback - tsparticles config loaded");
    })
    .catch((error) => {
      console.error(error);
    });
};

export default ParticlesWeb;
