import { CATEGORY } from "@/types/api/constants";

export const POST_CATEGORY_DEF: Record<CATEGORY, Record<string, string>> = {
  ad: {
    word: "프로젝트 소개",
    color: "bg-slate-700 text-slate-50",
  },
  question: {
    word: "질문",
    color: "bg-slate-500 text-slate-100",
  },
  consulting: {
    word: "일상",
    color: "bg-slate-100 text-slate-700 border-[1px] border-slate-400",
  },
};
