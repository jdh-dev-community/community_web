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
}

export const PostCategory: FC<Props> = ({ category }) => {
  const { word, style } = CATEGORY_DEFINITION[category.toLowerCase()];

  return (
    <div className="pb-0 max-sm:pb-2">
      <span
        className={`inline-block bg-blue-200 rounded-full py-2 text-l ${style} flex justify-center items-center`}
        style={{
          width: "100px",
          height: "30px",
          fontSize: "12px",
        }}
      >
        {word}
      </span>
    </div>
  );
};
