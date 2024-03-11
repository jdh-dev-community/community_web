import { getTimeDifference } from "@/utils/dateUtils";
import { FC } from "react";
import { PostCategory } from "../catogory/PostCategory";
import { Profile } from "../profile/Profile";
import { Comments } from "./Comments";

interface PostDetail {
  postId: number;
  title: string;
  content: string;
  category: string;
  creator: string;
  viewCount: number;
  createdAt: string;
  comments: [];
}

interface Props {
  className?: string;
  detail: PostDetail;
}

export const PostDetail2: FC<Props> = ({ className = "", detail }) => {
  const { postId, creator, createdAt, category, title, content } = detail;

  const handleClickShowMore = () => {
    console.log("id: >>" + postId);
  };

  return (
    <div className={className}>
      <div className="w-full flex justify-between relative">
        <div className="flex items-center">
          <Profile
            nickname={creator}
            imageStyle="w-[40px] h-[40px] lg:w-[60px] lg:h-[60px]"
            textStyle="custom-font-h2"
          />
          <div className="ml-[20px] custom-font-p text-slate-500">
            {getTimeDifference(createdAt)}
          </div>
        </div>

        <img
          src="/assets/images/vertical_showmore.png"
          width={"60px"}
          className="absolute right-[-25px]"
          onClick={handleClickShowMore}
        />
      </div>
      <div className="mt-[75px]">
        <PostCategory
          category={category}
          className="w-[120px] h-[40px] custom-font-p"
        />
      </div>
      <div className="mt-[20px]">
        <div className="h-[86px] w-full flex items-center  line-clamp-2 custom-font-h2">
          {title}
        </div>
      </div>
      <div className="mt-[75px]">
        <div className="custom-font-p">{content}</div>
      </div>
      <div className="mt-[100px]">
        <Comments data={detail} />
      </div>
    </div>
  );
};
