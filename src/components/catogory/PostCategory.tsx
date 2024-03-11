import { FC } from "react";

const CATEGORY_DEFINITION: Record<string, Record<string, string>> = {
  question: {
    word: "질문",
    style: "bg-slate-500 text-slate-100",
  },
  ad: {
    word: "프로젝트",
    style: "bg-slate-700 text-slate-50",
  },
  casual: {
    word: "데일리",
    style: "bg-slate-100 text-slate-700 border-[1px] border-slate-400",
  },
};

interface Props {
  category: string;
  className?: string;
}

export const PostCategory: FC<Props> = ({ category, className = "" }) => {
  const { word, style } = CATEGORY_DEFINITION[category.toLowerCase()];

  return (
    <div
      className={`rounded-full flex justify-center items-center ${className} ${style}`}
    >
      {word}
    </div>
  );
};
