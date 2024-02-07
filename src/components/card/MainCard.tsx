import { Board } from "@/pages/api/postList";
import { convertDateFormat } from "@/utils/dateUtils";
import { useRouter } from "next/router";
import React from "react";

export const MainCard = ({
  createdAt,
  postId,
  title,
  content,
  creator,
  category,
  viewCount,
}: Board) => {
  const route = useRouter();

  const handleClickCard = () => {
    route.push(`/post/${postId}`);
  };

  return (
    <div
      className="max-w-sm rounded-lg overflow-hidden shadow-lg m-4 bg-white border border-gray-200 hover:shadow-xl transition-shadow duration-300 cursor-pointer"
      onClick={handleClickCard}
    >
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 text-gray-900">{title}</div>
        <p className="text-gray-800 text-base mb-4">{content}</p>
      </div>
      <div className="px-6 flex justify-between items-center">
        <span className="inline-block bg-blue-100 text-blue-900 rounded-full px-3 py-1 text-xs font-semibold">
          {`#${category}`}
        </span>
      </div>
      <div className="px-2 pb-4 pt-2 gap-2 flex flex-row items-center justify-end">
        <span className="inline-block text-gray-600 rounded-full px-1 py-1 text-xs font-semibold">{`By ${creator}`}</span>
        {createdAt !== null && (
          <span className="text-xs font-semibold text-gray-600">
            {convertDateFormat(createdAt)}
          </span>
        )}
        <span className="inline-block text-gray-600 rounded-full px-1 py-1 text-xs font-semibold">{`조회수 ${viewCount}`}</span>
      </div>
    </div>
  );
};

export default MainCard;
