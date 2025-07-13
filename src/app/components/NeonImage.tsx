"use client";

import { useRef } from "react";

export const NeonImage = ({ src }: { src: string }) => {
  const videoRef = useRef(null);

  return (
    <div className="md:self-left h-40 min-h-40 w-40 min-w-40 self-center md:h-50 md:min-h-50 md:w-50 md:min-w-50">
      <video
        style={{ width: "100%", height: "100%", objectFit: "contain" }}
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
