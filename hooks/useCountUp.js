import { useState, useEffect } from "react";

export default function useCountUp(target, start, duration = 1500) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;

    let startTime = null;
    let rafId;

    function animate(timestamp) {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      setCount(Math.floor(percentage * target));

      if (percentage < 1) {
        rafId = requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    }

    rafId = requestAnimationFrame(animate);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [start, target, duration]);

  return count;
}