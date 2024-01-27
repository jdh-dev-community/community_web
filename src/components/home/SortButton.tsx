import { colors } from "@/styles/theme";
import React from "react";

interface Props {
  currentType: string;
  onClickButton: (type: string) => void;
}

export const NEWEST = "createdAt";

const SortingButtons = ({ currentType, onClickButton }: Props) => {
  return (
    <div className="flex justify-end mb-5">
      <button
        className={`px-4 py-2 mx-1 border transition-colors duration-300 rounded-md
        ${
          currentType === NEWEST
            ? "text-white"
            : " text-gray-700 hover:bg-gray-100"
        }`}
        style={{
          backgroundColor: currentType === NEWEST ? colors.primary : "#fff",
        }}
        onClick={() => onClickButton(NEWEST)}
      >
        최신순
      </button>
      <button
        className={`px-4 py-2 mx-1 border transition-colors duration-300 rounded-md
         ${
           currentType === "popular"
             ? "text-white"
             : "bg-white text-gray-700 hover:bg-gray-100"
         }`}
        style={{
          backgroundColor: currentType === "popular" ? colors.primary : "#fff",
        }}
        onClick={() => onClickButton("popular")}
      >
        인기순
      </button>
    </div>
  );
};

export default SortingButtons;
