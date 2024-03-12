import { FC } from "react";
import { POST_CATEGORY_DEF } from "@/constants/posts";
import { CATEGORY } from "@/types/api/constants";

interface Props {
  category: CATEGORY;
  className?: string;
}

export const PostCategory: FC<Props> = ({ category, className = "" }) => {
  const { word, color } = POST_CATEGORY_DEF[category];

  return (
    <div
      className={`rounded-full flex justify-center items-center ${className} ${color}`}
    >
      {word}
    </div>
  );
};
