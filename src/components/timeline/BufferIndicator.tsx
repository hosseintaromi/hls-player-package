import { useRef } from "react";
import { useVideo } from "../../hooks/useVideo";
import { BufferSize } from "./MediaTimeLineStyle";

const BufferIndicator = () => {
  const BufferRef = useRef<HTMLSpanElement>(null);

  useVideo({
    onUpdateBuffer: (e: number) => {
      if (BufferRef.current)
        BufferRef.current.style.width = `${JSON.stringify(Math.round(e))}%`;
    },
  });

  return <BufferSize ref={BufferRef} />;
};

export default BufferIndicator;
