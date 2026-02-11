"use client";

import { useEffect, useState } from "react";

export default function CountDown({ targetDate }: { targetDate: Date }) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const difference = +targetDate - +new Date();
    let timeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const TimerBox = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center bg-gray-900 text-white rounded-lg p-2 min-w-[60px] shadow-md">
      <span className="text-xl font-bold font-mono">
        {value.toString().padStart(2, "0")}
      </span>
      <span className="text-[10px] uppercase text-gray-400">{label}</span>
    </div>
  );

  return (
    <div className="flex flex-wrap gap-3">
      <TimerBox value={timeLeft.days} label="Days" />
      <TimerBox value={timeLeft.hours} label="Hrs" />
      <TimerBox value={timeLeft.minutes} label="Mins" />
      <TimerBox value={timeLeft.seconds} label="Secs" />
    </div>
  );
}
