import React from "react";
import Lottie from "react-lottie";
import pfeEtsAnimation from "../../public/pfe-ets-animation.json";

export default function LoadingPFE() {
  return (
    <div className=" fixed top-0 left-0 z-50 flex h-screen w-screen flex-col items-center justify-center bg-white/20 backdrop-blur-sm">
      <Lottie
        options={{
          loop: true,
          autoplay: true,
          animationData: pfeEtsAnimation,
          rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
          },
        }}
        height={150}
        width={300}
      />
      <div className="h-4" />
      <h1 className=" text-xl text-neutral-500">Chargement...</h1>
    </div>
  );
}
