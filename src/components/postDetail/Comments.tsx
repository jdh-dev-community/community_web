import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { INACTIVE, deletedComment } from "@/constants";
import { useCommentManager } from "@/hooks/postDetail/useCommentManager";
import { BASE_COMMENT } from "@/types/api/commentApi";
import { PostDetail_Response } from "@/types/api/postApi";
import { getTimeDifference } from "@/utils/dateUtils";
import { isEmpty } from "lodash";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Separator } from "../ui/separator";

interface Props {
  data: PostDetail_Response;
}

export const Comments = ({ data }: Props) => {
  const [openDeletePopup, setOpenDeletePopup] = useState(false);

  const {
    comments,
    reCommentList,
    openReCommentForm,
    isVisibleReComment,
    setCommentId,
    handleCommentSubmit,
    getReComment,
    getCommentList,
    handleVisibleReComment,
    handleReCommentForm,
    handleCommentRemove,
  } = useCommentManager(data, setOpenDeletePopup);

  return (
    <div className="pb-[60px]">
      <form id="comment" onSubmit={handleCommentSubmit}>
        <div className="flex justify-start">
          <div className="flex-none my-auto mb-0 w-[77px]">댓글</div>
          <Input
            className="flex-1 border-0 rounded-none h-[20px] my-auto mb-0 px-0"
            type="text"
            name="content"
            placeholder="이곳에 댓글을 입력해주세요"
            required
          />
          <Button
            variant="ghost"
            size="sm"
            type="submit"
            className="flex-none w-23 h-13 my-auto mb-0 px-0 ml-2"
            onClick={() => setCommentId(null)}
          >
            확인
          </Button>
        </div>

        <Separator className="mb-2" />

        <div className="flex justify-start ml-[77px] mr-[40px]">
          <Input
            className="flex-1 border-0 border-b rounded-none h-[20px] my-auto  px-0"
            type="text"
            name="creator"
            placeholder="닉네임"
            required
          />
          <Input
            className="flex-1 border-0 border-b rounded-none ml-[30px] h-[20px] my-auto px-0"
            type="text"
            name="password"
            placeholder="비밀번호"
            required
          />
        </div>
      </form>

      {/* 댓글 목록 */}
      {comments?.content?.map((content) => {
        const reCommentCount = Math.max(
          content.childrenCommentCount,
          reCommentList[content.commentId]?.elementsCount ?? 0
        );
        const hasReComment =
          reCommentCount >
          (reCommentList[content.commentId]?.content?.length ?? 0);

        return (
          <div key={content.commentId} className="mt-[20px]">
            <div className="flex flex-row items-start">
              <div className="w-[32px] h-[32px] rounded-[50%] bg-[#B666AE] mr-[6px]" />
              <div className="w-full">
                <div className="flex justify-between items-center">
                  <div className="flex flex-row items-center h-[32px]">
                    <div className="text-sm mr-[10px] mb-0.5">
                      {content.creator}
                    </div>
                    <div className="text-slate-500 text-xs">
                      {getTimeDifference(content.createdAt)}
                    </div>
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <img
                        src="/assets/images/vertical_showmore.png"
                        className="w-[32px] h-[32px]"
                      />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="">
                      <DropdownMenuItem
                        onClick={() => {
                          setCommentId(content.commentId);
                          setOpenDeletePopup(true);
                        }}
                      >
                        삭제하기
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className="text-sm">
                  {content.status === INACTIVE
                    ? deletedComment
                    : content.content}
                </div>

                <div className="flex items-center mb-[15px]">
                  <Button
                    variant="ghost"
                    className="w-[23px] h-[14px] text-[12px] px-0 text-decoration-line: underline "
                    onClick={() => handleReCommentForm(content.commentId)}
                  >
                    {openReCommentForm[content.commentId] ? "취소" : "답글"}
                  </Button>

                  {reCommentCount > 0 && (
                    <Button
                      onClick={async () => {
                        if (isEmpty(reCommentList[content.commentId])) {
                          await getReComment(content.commentId);
                        }

                        handleVisibleReComment(content.commentId);
                      }}
                      variant="ghost"
                      size="sm"
                      className="text-[12px] h-[14px] text-slate-400"
                    >
                      {`${reCommentCount}개의 답글이 있어요`}
                    </Button>
                  )}
                </div>

                {/* 답글 작성폼 */}
                {openReCommentForm[content.commentId] && (
                  <form onSubmit={handleCommentSubmit}>
                    <div className="flex">
                      <Input
                        className="flex-1 border-0 rounded-none h-[20px] my-auto mb-0 px-0 text-xs"
                        type="text"
                        name="content"
                        placeholder="이곳에 댓글을 입력해주세요"
                        required
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex-none w-23 h-13 my-auto mb-0 text-xs px-0 ml-2"
                        onClick={() => {
                          setCommentId(content.commentId);
                          handleVisibleReComment(content.commentId);
                        }}
                      >
                        확인
                      </Button>
                    </div>

                    <Separator className="mb-2" />

                    <div className="flex justify-start mr-[40px]">
                      <Input
                        className="flex-1 border-0 border-b rounded-none h-[20px] my-auto  px-0 text-xs"
                        type="text"
                        name="creator"
                        placeholder="닉네임"
                        required
                      />
                      <Input
                        className="flex-1 border-0 border-b rounded-none ml-[30px] h-[20px] my-auto px-0 text-xs"
                        type="text"
                        name="password"
                        placeholder="비밀번호"
                        required
                      />
                    </div>
                  </form>
                )}

                {/* 대댓글 목록 */}
                {isVisibleReComment[content.commentId] &&
                  reCommentList[content.commentId]?.content?.map(
                    (reply: BASE_COMMENT) => {
                      return (
                        <div
                          key={reply.commentId}
                          className="flex flex-row items-start my-4"
                        >
                          <div className="w-[32px] h-[32px] rounded-[50%] bg-[#B666AE] mr-[6px]" />
                          <div className="w-full">
                            <div className="flex justify-between items-center">
                              <div className="flex flex-row items-center h-[32px]">
                                <div className="text-sm mr-[10px] mb-0.5">
                                  {reply.creator}
                                </div>
                                <div className="text-slate-500 text-xs">
                                  {getTimeDifference(reply.createdAt)}
                                </div>
                              </div>

                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <img
                                    src="/assets/images/vertical_showmore.png"
                                    className="w-[32px] h-[32px]"
                                  />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="">
                                  <DropdownMenuItem
                                    onClick={() => {
                                      setCommentId(reply.commentId);
                                      setOpenDeletePopup(true);
                                    }}
                                  >
                                    삭제하기
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                            <p className="text-sm">
                              {reply.status === INACTIVE
                                ? deletedComment
                                : reply.content}
                            </p>
                          </div>
                        </div>
                      );
                    }
                  )}

                {hasReComment &&
                  reCommentList[content.commentId]?.content?.length > 0 && (
                    <Button
                      onClick={() => getReComment(content.commentId)}
                      variant="ghost"
                      size="sm"
                      className="text-[12px] text-slate-400"
                    >
                      답글 더보기
                    </Button>
                  )}
              </div>
            </div>
          </div>
        );
      })}

      {comments?.elementsCount > (comments?.content?.length || 0) && (
        <Button
          onClick={() => getCommentList()}
          variant="ghost"
          size="sm"
          className="text-[12px] text-slate-400 mb-[60px]"
        >
          댓글 더보기
        </Button>
      )}

      <Dialog open={openDeletePopup} onOpenChange={setOpenDeletePopup}>
        <DialogContent className="w-[70%] rounded-[10px]">
          <DialogHeader>
            <DialogTitle className="text-sm md:text-base">
              댓글을 삭제하시겠습니까?
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleCommentRemove}>
            <Input
              placeholder="비밀번호"
              name="password"
              type="text"
              className="mt-2 md:mt-6"
              required
            />
            <div className="mt-4 flex justify-end">
              <Button
                variant="outline"
                className="mr-[10px]"
                onClick={() => setOpenDeletePopup(false)}
              >
                취소
              </Button>

              <Button type="submit" variant="destructive">
                삭제
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
