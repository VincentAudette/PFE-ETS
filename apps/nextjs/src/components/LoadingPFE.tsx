import React from "react";
import Lottie from "react-lottie";
import pfeEtsAnimation from "../../public/pfe-ets-animation.json";

export default function LoadingPFE() {
  return (
    <div className="absolute z-50 flex h-screen w-screen flex-col items-center justify-center bg-white/20 backdrop-blur-md">
      <Lottie
        options={{
          loop: true,
          autoplay: true,
          animationData: pfeEtsAnimation,
          rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
          },
        }}
        height={400}
        width={700}
      />
      <h1 className="sr-only text-2xl font-bold text-gray-700">
        Chargement...
      </h1>
    </div>
  );
}
