import { usePostManager } from "@/hooks/postDetail/usePostManage";
import { getTimeDifference } from "@/utils/dateUtils";
import { FC, useState } from "react";
import { PostCategory } from "../catogory/PostCategory";
import { DeleteFormSheet } from "../form/DeleteFormSheet";
import { UpdateFormSheet } from "../form/UpdateFormSheet";
import { Profile } from "../profile/Profile";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Comments } from "./Comments";
import { PostDetail_Response } from "@/types/api/postApi";

interface Props {
  className?: string;
  detail: PostDetail_Response;
  isMobile?: boolean;
}

export const PostDetailComponent: FC<Props> = ({
  className = "",
  detail,
  isMobile = false,
}) => {
  const { postId, creator, createdAt, category, title, content } = detail;

  const [openUpdateSheet, setOpenUpdateSheet] = useState(false);
  const [openDeleteSheet, setOpenDeleteSheet] = useState(false);

  const { postContent, handleRemove, hasAuth, handleUpdate, onEditContent } =
    usePostManager(detail);

  const handleClickShowMore = () => {
    console.log("id: >>" + postId);
  };

  return (
    <div className={className}>
      <div className="flex justify-between relative ">
        <div className="flex items-center">
          <Profile
            nickname={creator}
            imageStyle="w-[40px] h-[40px] lg:w-[60px] lg:h-[60px]"
            textStyle="custom-font-h2"
          />
          <div
            className={`ml-[20px] text-slate-500 ${
              isMobile ? "custom-font-additional mt-[1.5px]" : "custom-font-p"
            }`}
          >
            {getTimeDifference(createdAt)}
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <img
              src="/assets/images/vertical_showmore.png"
              className="w-[36px] h-[36px] lg:w-[62px] lg:h-[62px]"
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="">
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => setOpenUpdateSheet(true)}>
                수정하기
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setOpenDeleteSheet(true)}>
                삭제하기
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="mt-[75px]">
        <PostCategory
          category={category}
          className={`w-[90px] lg:w-[120px] h-[30px] lg:h-[40px] ${
            isMobile ? "custom-font-additional" : "custom-font-p"
          }`}
        />
      </div>
      <div className="mt-[20px]">
        <div
          className={`h-[56px] lg:h-[86px] w-full flex items-center  line-clamp-2 ${
            isMobile ? "custom-font-h4" : "custom-font-h2"
          }`}
        >
          {title}
        </div>
      </div>
      <div className="mt-[75px]">
        <div
          className={`${isMobile ? "custom-font-subtitle" : "custom-font-p"}`}
        >
          {content}
        </div>
      </div>
      <div className="mt-[100px]">
        <Comments data={detail} />
      </div>

      <UpdateFormSheet
        postContent={postContent}
        hasAuth={hasAuth}
        onEditContent={onEditContent}
        handleUpdate={handleUpdate}
        openSheet={openUpdateSheet}
        setOpenSheet={setOpenUpdateSheet}
      />

      <DeleteFormSheet
        postContent={postContent}
        hasAuth={hasAuth}
        handleRemove={handleRemove}
        openSheet={openDeleteSheet}
        setOpenSheet={setOpenDeleteSheet}
      />
    </div>
  );
};
