/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";

interface TimerProps {
  duration: number; 
}

const Timer: React.FC<TimerProps> = ({ duration }) => {
  const [timeLeft, setTimeLeft] = useState<number>(duration * 60); 
  const [isTimeCritical, setIsTimeCritical] = useState<boolean>(false);

  const startTimer = (initialTime: number) => {
    const interval = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(interval);
          return 0;
        }
        const updatedTime = prevTime - 1;
        if (updatedTime <= 10) {
          setIsTimeCritical(true); 
        } else {
          setIsTimeCritical(false);
        }

        return updatedTime;
      });
    }, 1000); 
    return () => clearInterval(interval);
  };

  useEffect(() => {
    setTimeLeft(duration * 60); 
    const cleanupInterval = startTimer(duration * 60); 
    return cleanupInterval; 
  }, [duration]); 

  // Format the time into MM:SS format
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div
      className={`font-normal text-xl ${
        isTimeCritical ? "text-red-500" : "text-[#11CE19]"
      }`}
    >
      {timeLeft > 0 ? formatTime(timeLeft) : "00:00"}
    </div>
  );
};

export default Timer;
