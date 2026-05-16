import { useEffect, useRef } from 'react';
import { animate } from 'animejs';

/**
 * AnimatedProgressBar - Animates a progress bar from 0 to a target percent using Anime.js v4.
 * Usage: <AnimatedProgressBar percent={75} color="bg-bmi-blue" />
 */
export default function AnimatedProgressBar({
  percent,
  color = 'bg-bmi-blue',
  height = 'h-2',
  delay = 200,
  duration = 1200,
  className = '',
}) {
  const barRef = useRef(null);

  useEffect(() => {
    if (!barRef.current) return;

    animate(barRef.current, {
      width: [`0%`, `${percent}%`],
      duration,
      delay,
      ease: 'outQuart',
    });
  }, [percent, duration, delay]);

  return (
    <div className={`w-full bg-slate-200 rounded-full overflow-hidden ${height} ${className}`}>
      <div
        ref={barRef}
        className={`h-full rounded-full ${color}`}
        style={{ width: '0%' }}
      />
    </div>
  );
}
