import { useEffect, useRef, useState } from "react";

interface Props {
  value: number;
  duration?: number;
  formatter?: (n: number) => string;
}

export const AnimatedNumber = ({
  value,
  duration = 1000,
  formatter = (n) => n.toLocaleString(),
}: Props) => {
  const [display, setDisplay] = useState(0);
  const startTime = useRef<number | null>(null);
  const startVal  = useRef(0);
  const rafRef    = useRef<number>(0);

  useEffect(() => {
    startVal.current  = display;
    startTime.current = null;

    const animate = (now: number) => {
      if (!startTime.current) startTime.current = now;
      const elapsed  = now - startTime.current;
      const progress = Math.min(elapsed / duration, 1);
      const eased    = 1 - Math.pow(1 - progress, 3);
      const current  = Math.round(startVal.current + (value - startVal.current) * eased);
      setDisplay(current);
      if (progress < 1) rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [value, duration]);

  return <span>{formatter(display)}</span>;
};