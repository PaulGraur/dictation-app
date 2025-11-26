"use client";
import React, { FC, RefObject } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

import SpeedIcon from "@/image/icons/speed-icon.svg";
import PlayIcon from "@/image/icons/play-icon.svg";
import PauseIcon from "@/image/icons/pause-icon.svg";

interface ControlsProps {
  speed: number;
  setSpeed: (s: number) => void;
  isPlaying: boolean;
  isPaused: boolean;
  togglePlayPause: () => void;
  showOriginalText: boolean;
  setShowOriginalText: (v: boolean) => void;
  dropdownRef: RefObject<HTMLDivElement | null>;
}

const speeds = [0.5, 0.75, 1, 1.25, 1.5];

const Controls: FC<ControlsProps> = ({
  speed,
  setSpeed,
  isPlaying,
  isPaused,
  togglePlayPause,
  showOriginalText,
  setShowOriginalText,
  dropdownRef,
}) => {
  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownRef]);

  return (
    <div className="flex items-stretch gap-2 w-max ml-auto mb-2">
      <div className="relative flex-1" ref={dropdownRef}>
        <div
          className="flex items-center gap-2 bg-white/20 backdrop-blur-md text-gunmetal font-bold text-lg border border-white/30 rounded-[24px] px-4 cursor-pointer"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          <Image src={SpeedIcon} alt="speed" width={40} />
          <p className="flex-1">{speed}</p>
        </div>

        <AnimatePresence>
          {dropdownOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute bg-white/20 backdrop-blur-xl text-center text-gunmetal font-bold w-full mt-1 rounded-[24px] border border-white/30 z-10 overflow-hidden shadow-lg"
            >
              {speeds.map((s) => (
                <motion.div
                  key={s}
                  whileHover={{ scale: 1.05 }}
                  className="p-2 cursor-pointer hover:bg-white/30 transition"
                  onClick={() => {
                    setSpeed(s);
                    setDropdownOpen(false);
                  }}
                >
                  {s}
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <button
        onClick={togglePlayPause}
        className="w-[62px] flex items-center justify-center bg-white/20 text-gunmetal font-bold text-lg border border-solid border-white/30 rounded-[24px] px-4 cursor-pointer relative"
      >
        <AnimatePresence mode="wait">
          {isPlaying && !isPaused ? (
            <motion.div
              key="pause"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              className="absolute flex items-center justify-center"
            >
              <Image src={PauseIcon} alt="PauseIcon" width={30} />
            </motion.div>
          ) : (
            <motion.div
              key="play"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              className="absolute flex items-center justify-center"
            >
              <Image src={PlayIcon} alt="PlayIcon" width={30} />
            </motion.div>
          )}
        </AnimatePresence>
      </button>

      <button
        className="flex items-center gap-2 bg-white/20 backdrop-blur-md text-gunmetal font-bold text-lg border border-solid border-white/30 rounded-[24px] px-4 cursor-pointer"
        onClick={() => setShowOriginalText(!showOriginalText)}
      >
        {showOriginalText ? "Сховати текст" : "Показати текст"}
      </button>
    </div>
  );
};

export default Controls;
