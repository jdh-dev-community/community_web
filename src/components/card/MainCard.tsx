import { Board } from "@/pages/api/postList";
import { convertDateFormat } from "@/utils/dateUtils";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "../ui/card";
import { onRemoveHtmlTag } from "@/utils/baseUtils";

export const MainCard = ({
  createdAt,
  postId,
  title,
  content,
  creator,
  category,
  viewCount,
  onClick = () => {},
}: Board) => {
  return (
    <Card
      onClick={() => onClick(postId)}
      className="flex flex-col max-w-xs h-60 sm:max-w-sm rounded-lg overflow-hidden justify-between shadow-lg m-2 bg-white border border-gray-200 hover:shadow-xl transition-shadow duration-300 cursor-pointer"
    >
      <CardContent className="px-4 sm:px-6 py-4">
        <CardTitle className="font-bold text-lg sm:text-xl mb-2 text-gray-900 line-clamp-1">
          {title}
        </CardTitle>
        <CardDescription className="text-gray-800 text-base mb-4 line-clamp-3">
          {onRemoveHtmlTag(content)}
        </CardDescription>
      </CardContent>

      <div className="flex flex-col pb-4">
        <CardContent className="pb-0 max-sm:pb-2">
          <span className="inline-block bg-blue-200 text-blue-900 rounded-full px-3 py-1 text-l">{`#${category}`}</span>
        </CardContent>

        <CardFooter
          className="gap-2 flex flex-row items-center justify-end"
          style={{ paddingBottom: 0 }}
        >
          <span className="inline-block text-gray-600 rounded-full px-1 py-1 text-xs font-semibold">{`By ${creator}`}</span>
          {createdAt !== null && (
            <span className="text-xs font-semibold text-gray-600">
              {convertDateFormat(createdAt)}
            </span>
          )}
          <span className="inline-block text-gray-600 rounded-full px-1 py-1 text-xs font-semibold">{`조회수 ${viewCount}`}</span>
        </CardFooter>
      </div>
    </Card>
  );
};

export default MainCard;
