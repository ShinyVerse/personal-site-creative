"use client";

import { useRef } from "react";

export const NeonImage = ({ src }: { src: string }) => {
  const videoRef = useRef(null);

  return (
    <div className="flex h-[100px] w-[100px] items-center self-center overflow-hidden md:h-[150px] md:min-h-[150px] md:w-[150px] md:min-w-[150px]">
      <video
        style={{ width: "100%", height: "100%" }}
        ref={videoRef}
        src={src}
        autoPlay
        muted
        playsInline
        loop
      ></video>
    </div>
  );
};
