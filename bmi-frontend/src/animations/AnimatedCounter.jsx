import { useEffect, useRef } from 'react';
import { animate } from 'animejs';

/**
 * AnimatedCounter - Counts up from 0 to a target number using Anime.js v4.
 * Usage: <AnimatedCounter value={48} suffix="+" className="text-3xl font-bold" />
 */
export default function AnimatedCounter({
  value,
  suffix = '',
  prefix = '',
  duration = 1600,
  delay = 0,
  className = '',
}) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;

    const counter = { val: 0 };

    const anim = animate(counter, {
      val: value,
      round: 1,
      duration,
      delay,
      ease: 'outExpo',
      onUpdate() {
        if (ref.current) {
          ref.current.textContent = `${prefix}${Math.round(counter.val).toLocaleString('id-ID')}${suffix}`;
        }
      },
    });

    return () => anim.pause();
  }, [value, duration, delay, prefix, suffix]);

  return (
    <span ref={ref} className={className}>
      {prefix}0{suffix}
    </span>
  );
}
