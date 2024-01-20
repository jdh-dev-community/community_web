import React from "react";

export type MainCardInfo = {
  createdAt: string | null;
  updatedAt: string | null;
  postId: number;
  title: string;
  textContent: string;
  creator: string;
  category: string;
  viewCount: number;
};

export const MainCard = ({
  createdAt,
  updatedAt,
  postId,
  title,
  textContent,
  creator,
  category,
  viewCount,
}: MainCardInfo) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg m-4 bg-white">
      <div className="px-4 py-4">
        <div className="text-gray-700 font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-700 text-base">{textContent}</p>
      </div>
      <div className="px-4 pt-4 pb-4 gap-2 flex flex-row flex-wrap">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-xs font-semibold text-gray-500 ">
          {category}
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-xs font-semibold text-gray-500 ">{`By ${creator}`}</span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-xs font-semibold text-gray-500 ">{`Views: ${viewCount}`}</span>
      </div>
      {createdAt !== null && (
        <div className="px-4 pt-4 pb-2 text-xs">
          <p>{`Created at: ${createdAt}`}</p>
        </div>
      )}
    </div>
  );
};

export default MainCard;
