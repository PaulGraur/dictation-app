"use client";

import { useRef, useState } from "react";
import { useDictation } from "@/hooks/useDictation";
import Controls from "@/components/Controls";
import OriginalTextarea from "@/components/OriginalTextarea";
import UserTextarea from "@/components/UserTextarea";
import ResultBox from "@/components/ResultBox";
import { motion } from "framer-motion";

const HomeSection = () => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [showOriginalText, setShowOriginalText] = useState(true);
  const [checked, setChecked] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const dictation = useDictation();

  const handleCheck = () => {
    dictation.checkText();
    setShowResult((prev) => !prev);
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 p-6">
      <motion.div
        className="w-[100%] bg-white/10 backdrop-blur-md border border-white/20 rounded-[24px] p-6 shadow-lg"
        layout
      >
        <h2 className="text-[36px] mb-[40px] font-bold text-white text-center ">
          Диктант
        </h2>

        <Controls
          speed={dictation.speed}
          setSpeed={dictation.setSpeed}
          isPlaying={dictation.isPlaying}
          isPaused={dictation.isPaused}
          togglePlayPause={dictation.togglePlayPause}
          showOriginalText={showOriginalText}
          setShowOriginalText={setShowOriginalText}
          dropdownRef={dropdownRef}
        />

        <OriginalTextarea
          value={dictation.originalText}
          onChange={(e) => dictation.setOriginalText(e.target.value)}
          show={showOriginalText}
        />

        <h3 className="text-white font-semibold mb-2">Твоє написання:</h3>
        <UserTextarea
          value={dictation.userText}
          onChange={(e) => dictation.setUserText(e.target.value)}
        />

        <button
          onClick={handleCheck}
          className={`flex items-center ml-auto py-2 gap-2 bg-white/20 backdrop-blur-md text-gunmetal font-bold text-lg border border-solid border-white/30 rounded-[24px] px-4 cursor-pointer ${
            showResult ? "mb-[20px]" : ""
          }`}
        >
          {showResult ? "Приховати" : "Перевірити"}
        </button>

        <ResultBox result={dictation.result} show={showResult} />
      </motion.div>
    </section>
  );
};

export default HomeSection;
