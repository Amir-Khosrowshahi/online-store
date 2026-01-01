"use client";
import React, { useState, useEffect } from "react";

interface CountdownTimerProps {
  targetTime: Date;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetTime }) => {
  const [timeLeft, setTimeLeft] = useState({
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      const diff = targetTime.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeLeft({ hours: "00", minutes: "00", seconds: "00" });
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({
        hours: String(hours).padStart(2, "0"),
        minutes: String(minutes).padStart(2, "0"),
        seconds: String(seconds).padStart(2, "0"),
      });
    };

    updateTimer();
    const timerId = setInterval(updateTimer, 1000);
    return () => clearInterval(timerId);
  }, [targetTime]);

  return (
    <div
      style={{
        position: "absolute",
        top: 10,
        left: "50%",
        transform: "translateX(-50%)",
        backgroundColor: "#fdecf0",
        padding: "6px 12px",
        borderRadius: 8,
        fontWeight: "bold",
        direction: "ltr",
      }}
      className='flex justify-between w-full text-[#e8274e] text-[14px] '
    >
      <div style={{ direction: "ltr" }}>
        <span className='mr-1'>
          {timeLeft.hours} {""} :
        </span>
        <span className='mr-1'>
          {timeLeft.minutes} {""} :
        </span>
        <span>{timeLeft.seconds}</span>
      </div>
      <h3 className='text-[#e6123d]'>پیشنهاد ویژه</h3>
    </div>
  );
};

export default CountdownTimer;
