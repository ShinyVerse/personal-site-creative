"use client";

import { useRef } from "react";
import { tv } from "tailwind-variants";

const neonImageStyles = tv({
  slots: {
    container: "md:self-left h-40 min-h-40 w-40 min-w-40 self-center md:h-50 md:min-h-50 md:w-50 md:min-w-50",
    video: "w-full h-full object-contain",
  },
});

export const NeonImage = ({ src }: { src: string }) => {
  const videoRef = useRef(null);
  const styles = neonImageStyles();

  return (
    <div className={styles.container()}>
      <video
        className={styles.video()}
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
