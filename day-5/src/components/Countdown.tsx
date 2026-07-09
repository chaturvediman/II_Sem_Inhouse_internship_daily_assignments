import { useEffect, useState } from 'react';

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function calc(target: Date): TimeLeft {
  const diff = target.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff / 3_600_000) % 24),
    minutes: Math.floor((diff / 60_000) % 60),
    seconds: Math.floor((diff / 1_000) % 60),
  };
}

export default function Countdown({
  target,
  label,
  compact = false,
}: {
  target: Date;
  label?: string;
  compact?: boolean;
}) {
  const [time, setTime] = useState<TimeLeft>(() => calc(target));
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      const t = calc(target);
      setTime(t);
      if (t.days === 0 && t.hours === 0 && t.minutes === 0 && t.seconds === 0) {
        setExpired(true);
      }
    }, 1000);
    return () => clearInterval(id);
  }, [target]);

  const units = [
    { value: time.days, label: 'Days' },
    { value: time.hours, label: 'Hours' },
    { value: time.minutes, label: 'Minutes' },
    { value: time.seconds, label: 'Seconds' },
  ];

  if (compact) {
    return (
      <div className="flex items-center gap-2 font-mono text-sm">
        <span className="text-cyan-400 font-bold">
          {String(time.days).padStart(2, '0')}d
        </span>
        <span className="text-slate-500">:</span>
        <span className="text-cyan-400 font-bold">
          {String(time.hours).padStart(2, '0')}h
        </span>
        <span className="text-slate-500">:</span>
        <span className="text-cyan-400 font-bold">
          {String(time.minutes).padStart(2, '0')}m
        </span>
        <span className="text-slate-500">:</span>
        <span className="text-cyan-400 font-bold">
          {String(time.seconds).padStart(2, '0')}s
        </span>
      </div>
    );
  }

  return (
    <div>
      {label && (
        <p className="text-center text-slate-300 text-sm font-semibold tracking-wider uppercase mb-4">
          {label}
        </p>
      )}
      <div className="flex items-center justify-center gap-3 sm:gap-4">
        {units.map((u, i) => (
          <div key={u.label} className="flex items-center gap-3 sm:gap-4">
            <div className="flex flex-col items-center">
              <div className="relative w-16 sm:w-20 md:w-24 h-16 sm:h-20 md:h-24 rounded-2xl bg-slate-900/80 border border-white/10 backdrop-blur-md flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-cyan-400/5 to-transparent" />
                <span className="relative text-2xl sm:text-3xl md:text-4xl font-black text-white tabular-nums">
                  {String(u.value).padStart(2, '0')}
                </span>
              </div>
              <span className="mt-2 text-xs sm:text-sm text-slate-400 font-semibold tracking-wide">
                {u.label}
              </span>
            </div>
            {i < units.length - 1 && (
              <span className="text-2xl sm:text-3xl text-cyan-400/40 font-black -mt-6">
                :
              </span>
            )}
          </div>
        ))}
      </div>
      {expired && (
        <p className="text-center mt-4 text-amber-400 text-sm font-semibold">
          Registrations are now closed.
        </p>
      )}
    </div>
  );
}
