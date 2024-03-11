import { convertDateFormat } from "@/utils/dateUtils";

import { DeleteFormSheet } from "@/components/form/DeleteFormSheet";
import { UpdateFormSheet } from "@/components/form/UpdateFormSheet";
import { CommentForm } from "@/components/postDetail/CommentForm";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useCommentManager } from "@/hooks/postDetail/useCommentManager";
import { usePostManager } from "@/hooks/postDetail/usePostManage";
import { BASE_COMMENT } from "@/types/api/commentApi";
import { PostDetail_Response } from "@/types/api/postApi";
import { useState } from "react";

export default function PostDetail({ data }: { data: PostDetail_Response }) {
  const [openCommentDialog, setOpenCommentDialog] = useState(false);

  const { postContent, handleRemove, hasAuth, handleUpdate, onEditContent } =
    usePostManager(data);

  const {
    comments,
    reCommentList,
    setCommentId,
    handleCommentSubmit,
    getReComment,
    getCommentList,
  } = useCommentManager(data, setOpenCommentDialog);
  return (
    <>
      {" "}
      <div className="h-20 flex items-center justify-center mt-20">
        <h1 className="text-black text-3xl">{data.title}</h1>
      </div>
      {/* 카드 형식의 컨텐츠 */}
      <div className="max-w mx-auto  sm:p-5">
        <div className="bg-white p-8 rounded-lg shadow-lg mb-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-1">
            <div className="text-base font-medium text-gray-700">
              <span>작성자: {postContent.creator}</span>
              <span className="mx-3">•</span>
              <span>조회수: {postContent.viewCount}</span>
            </div>

            <div className="text-base text-gray-600">
              작성일:{" "}
              {postContent.createdAt
                ? convertDateFormat(postContent.createdAt)
                : "알 수 없음"}
            </div>
          </div>
          <div className="text-base font-medium text-gray-700  mb-6">
            카테고리: {postContent.category}
          </div>

          <div
            className="text-gray-800 text-lg"
            dangerouslySetInnerHTML={{ __html: postContent.content }}
            suppressHydrationWarning
          />
        </div>

        <div className="mb-20">
          <UpdateFormSheet
            postContent={postContent}
            hasAuth={hasAuth}
            onEditContent={onEditContent}
            handleUpdate={handleUpdate}
          />

          <DeleteFormSheet
            postContent={postContent}
            hasAuth={hasAuth}
            handleRemove={handleRemove}
          />
        </div>

        <div className="flex justify-between">
          <div className="my-auto mb-0 w-[77px]">댓글</div>
          <Input
            className="border-0 rounded-none h-[20px] my-auto mb-0"
            type="text"
            name="content"
            placeholder="이곳에 댓글을 입력해주세요"
            required
          />
          <Button
            variant="ghost"
            size="sm"
            className="w-23 h-13 my-auto mb-0"
            onClick={() => setCommentId(null)}
          >
            확인
          </Button>

          <Separator className="mb-2 mt-1" />
          <div className="flex ml-[77px]">
            <Input
              className="border-0 border-b  rounded-none max-w-[35%] h-[20px] my-auto mb-0"
              type="text"
              name="content"
              placeholder="닉네임"
              required
            />
            <Input
              className="flex border-0 border-b rounded-none max-w-[35%] ml-[30px] h-[20px] my-auto mb-0"
              type="text"
              name="content"
              placeholder="비밀번호"
              required
            />
          </div>
        </div>
        <Separator className="mb-2 mt-1" />
        {/* 댓글 목록 */}
        {comments?.content?.map((content) => {
          const hasReComment =
            Math.max(
              content.childrenCommentCount,
              reCommentList[content.commentId]?.elementsCount ?? 0
            ) > (reCommentList[content.commentId]?.content?.length ?? 0);

          return (
            <div key={content.commentId} className="mb-12 mt-4">
              <div className="flex flex-row justify-between mb-4">
                <div>
                  <div className="flex flex-row mb-1">
                    <div className="text-xs">@</div>
                    <div className="text-xs font-bold">{content.creator}</div>
                    <div className="text-gray-500 text-xs ml-1">
                      {content.createdAt
                        ? convertDateFormat(content.createdAt)
                        : "알 수 없음"}
                    </div>
                  </div>

                  <p className="text-base">{content.content}</p>
                </div>

                <Dialog
                  open={openCommentDialog}
                  onOpenChange={setOpenCommentDialog}
                >
                  <DialogTrigger asChild>
                    <Button
                      onClick={() => setCommentId(content.commentId)}
                      variant="outline"
                      size="sm"
                      className="text-xs font-bold"
                    >
                      답글
                    </Button>
                  </DialogTrigger>

                  <DialogContent>
                    <CommentForm handleSubmit={handleCommentSubmit} />
                  </DialogContent>
                </Dialog>
              </div>

              {/* 대댓글 목록 */}
              {reCommentList[content.commentId]?.content?.map(
                (reply: BASE_COMMENT) => {
                  return (
                    <div key={reply.commentId} className="ml-4 my-4">
                      <div className="flex flex-row mb-1">
                        <div className="text-xs">@</div>
                        <div className="text-xs font-bold">{reply.creator}</div>
                        <div className="text-gray-500 text-xs ml-1">
                          {reply.createdAt
                            ? convertDateFormat(reply.createdAt)
                            : "알 수 없음"}
                        </div>
                      </div>

                      <p className="text-base">{reply.content}</p>
                    </div>
                  );
                }
              )}

              {hasReComment && (
                <div>
                  <Button
                    onClick={() => getReComment(content.commentId)}
                    variant="ghost"
                    size="sm"
                    className="text-xs font-bold"
                  >
                    답글 보기
                  </Button>
                </div>
              )}
            </div>
          );
        })}

        {comments?.elementsCount > (comments?.content?.length || 0) && (
          <div>
            <Button
              onClick={() => getCommentList()}
              variant="ghost"
              size="sm"
              className="text-xs font-bold"
            >
              댓글 더 보기
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
