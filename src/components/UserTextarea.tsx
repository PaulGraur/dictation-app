"use client";
import { FC } from "react";

interface UserTextareaProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const UserTextarea: FC<UserTextareaProps> = ({ value, onChange }) => (
  <textarea
    placeholder="Пиши тут..."
    value={value}
    onChange={onChange}
    rows={5}
    className="w-[100%] h-[400px] p-3 rounded-[24px] bg-white/20 text-white placeholder-white/60 border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
  />
);

export default UserTextarea;
