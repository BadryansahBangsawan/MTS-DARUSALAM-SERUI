import { useEffect, useRef, useState } from "react";

export function useCounterAnimation(target: number, duration: number = 1200) {
  const [count, setCount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const requestRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);

  useEffect(() => {
    if (!isAnimating) return;

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp;
      }

      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      
      const currentCount = Math.floor(progress * target);
      setCount(currentCount);

      if (progress < 1) {
        requestRef.current = requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [target, duration, isAnimating]);

  const startAnimation = () => {
    if (!isAnimating) {
      setIsAnimating(true);
    }
  };

  const resetAnimation = () => {
    setIsAnimating(false);
    setCount(0);
  };

  return { count, startAnimation, resetAnimation, isAnimating };
}