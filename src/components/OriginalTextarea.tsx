"use client";
import { FC } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface OriginalTextareaProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  show: boolean;
}

const OriginalTextarea: FC<OriginalTextareaProps> = ({
  value,
  onChange,
  show,
}) => (
  <AnimatePresence>
    {show && (
      <motion.textarea
        key="original-text"
        placeholder="Введи текст для диктанту..."
        value={value}
        onChange={onChange}
        rows={5}
        className="w-[100%] p-3 rounded-[24px] bg-white/20 text-white placeholder-white/60 border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-400 transition mb-4"
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ duration: 0.3 }}
      />
    )}
  </AnimatePresence>
);

export default OriginalTextarea;
