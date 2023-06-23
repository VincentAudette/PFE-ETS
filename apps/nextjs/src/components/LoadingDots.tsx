import React, { useState, useEffect } from "react";

const LoadingDots = ({ darkMode = false }: { darkMode?: boolean }) => {
  const [dots, setDots] = useState(".");

  useEffect(() => {
    const timeoutId = setInterval(() => {
      setDots((dots) => {
        switch (dots) {
          case ".":
            return "..";
          case "..":
            return "...";
          case "...":
            return ".";
          default:
            return ".";
        }
      });
    }, 500); // adjust timing as needed

    return () => clearInterval(timeoutId); // cleanup on unmount
  }, []);

  return (
    <div className={darkMode ? "text-neutral-50" : "text-neutral-900"}>
      Chargement{dots}
    </div>
  );
};

export default LoadingDots;
