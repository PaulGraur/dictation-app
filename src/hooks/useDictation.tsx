import React, { JSX, useState, useRef } from "react";

export const useDictation = (initialText = "") => {
  const [originalText, setOriginalText] = useState(initialText);
  const [userText, setUserText] = useState("");
  const [result, setResult] = useState<JSX.Element[]>([]);
  const [speed, setSpeed] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const togglePlayPause = () => {
    if (!originalText) return;

    if (isPlaying) {
      if (isPaused) {
        window.speechSynthesis.resume();
        setIsPaused(false);
      } else {
        window.speechSynthesis.pause();
        setIsPaused(true);
      }
    } else {
      if (window.speechSynthesis.speaking) window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(originalText);
      utterance.lang = "de-DE";
      utterance.rate = speed;
      utterance.onend = () => {
        setIsPlaying(false);
        setIsPaused(false);
      };
      utteranceRef.current = utterance;
      window.speechSynthesis.speak(utterance);
      setIsPlaying(true);
      setIsPaused(false);
    }
  };

  const checkText = () => {
    const originalWords = originalText.split(/\s+/);
    const userWords = userText.split(/\s+/);

    const feedback = originalWords.map((word, i) => {
      const userWord = (userWords[i] ?? "")
        .replace(/[.,!?]/g, "")
        .trim()
        .toLowerCase();
      const cleanWord = word
        .replace(/[.,!?]/g, "")
        .trim()
        .toLowerCase();
      const isCorrect = cleanWord === userWord;

      return (
        <span
          key={i}
          style={{
            color: isCorrect ? "#fff" : "#dc2626",
            fontWeight: isCorrect ? "normal" : "bold",
          }}
        >
          {word + " "}
        </span>
      );
    });

    setResult(feedback);
  };

  return {
    originalText,
    setOriginalText,
    userText,
    setUserText,
    result,
    speed,
    setSpeed,
    isPlaying,
    isPaused,
    togglePlayPause,
    checkText,
    utteranceRef,
  };
};
