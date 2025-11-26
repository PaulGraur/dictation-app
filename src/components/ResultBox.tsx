"use client";
import { FC, JSX } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ResultBoxProps {
  result: JSX.Element[];
  show?: boolean;
}

const ResultBox: FC<ResultBoxProps> = ({ result, show = true }) => {
  return (
    <AnimatePresence>
      {show && result.length > 0 && (
        <motion.div
          initial={{ opacity: 0, scaleY: 0 }}
          animate={{ opacity: 1, scaleY: 1 }}
          exit={{ opacity: 0, scaleY: 0 }}
          transition={{ duration: 0.3 }}
          style={{ transformOrigin: "top" }}
          className="bg-white/10 backdrop-blur-md border border-white/20 rounded-[24px] p-4 break-words overflow-hidden"
        >
          <h3 className="text-white font-semibold mb-2">Результат:</h3>
          <div className="flex flex-wrap gap-1">{result}</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ResultBox;
