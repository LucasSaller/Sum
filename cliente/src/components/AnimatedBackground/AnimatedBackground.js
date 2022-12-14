import React from "react";
import "./AnimatedBackground.css";
const AnimatedBackground = ({ darkMode }) => {
  const colorDark = "#566482";
  const colorLight = "#b9ccf8";
  return (
    <div
      class="area"
      style={{ background: `${darkMode ? colorDark : colorLight}` }}
    >
      <ul class="circles">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>
  );
};

export default AnimatedBackground;
