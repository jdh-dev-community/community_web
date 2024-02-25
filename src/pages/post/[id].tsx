import { convertDateFormat } from "@/utils/dateUtils";

import { CommentForm } from "@/components/postDetail/CommentForm";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useCommentManager } from "@/hooks/postDetail/useCommentManager";
import { usePostManager } from "@/hooks/postDetail/usePostManage";
import { getParamsFromFormData } from "@/utils/common";
import dynamic from "next/dynamic";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { Board } from "../api/postList";

const ContentEditor = dynamic(
  () => import("@/components/common/ContentEditor"),
  {
    ssr: false,
  }
);

export default function PostDetail({
  data,
  isOpen,
  setOpen,
}: {
  data: Board & { comments: any[] };
  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const [openUpdateDrawer, setOpenUpdateDrawer] = useState(false);
  const [openCommentDialog, setOpenCommentDialog] = useState(false);
  const [openAuthDialog, setOpenAuthDialog] = useState(false);

  const { postContent, handleRemove, getToken, handleUpdate, onEditContent } =
    usePostManager(data, setOpenUpdateDrawer);
  const { commentList, setCommentId, handleCommentSubmit } = useCommentManager(
    data,
    setOpenCommentDialog
  );

  const checkUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const params = getParamsFromFormData(new FormData(e.currentTarget));

    await getToken({
      password: params.password,
      postId: data.postId,
    });

    setOpenAuthDialog(false);
    setOpenUpdateDrawer(true);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setOpen}>
      <SheetContent className="w-[800px] sm:w-[540px] sm:min-w-[1200px] overflow-auto">
        <div className="h-20 flex items-center justify-center ">
          <h1 className="text-black text-3xl">{data.title}</h1>
        </div>

        {/* 카드 형식의 컨텐츠 */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-gray-100 p-4 rounded-lg shadow-md mb-2">
            <div className="text-sm text-gray-500 mb-2">
              작성자 : {postContent.creator} | 조회수: {postContent.viewCount} |
              카테고리: {postContent.category}
            </div>
            <div className="text-sm text-gray-500 mb-4">
              작성일 :
              {postContent.createdAt
                ? convertDateFormat(postContent.createdAt)
                : "알 수 없음"}
            </div>
            <p className="text-gray-800">{postContent.content}</p>
          </div>

          <div className="flex justify-between mb-2">
            <div>
              <Dialog open={openAuthDialog} onOpenChange={setOpenAuthDialog}>
                <DialogTrigger asChild>
                  <Button variant="outline">수정</Button>
                </DialogTrigger>

                <DialogContent>
                  <form onSubmit={checkUser}>
                    <Input
                      placeholder="비밀번호"
                      name="password"
                      type="text"
                      className="mt-6"
                      required
                    />
                    <DialogFooter>
                      <Button
                        type="submit"
                        variant="destructive"
                        className="mt-4"
                      >
                        확인
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>

              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="ml-2">
                    삭제
                  </Button>
                </DialogTrigger>

                <DialogContent>
                  <form onSubmit={handleRemove}>
                    <Input
                      placeholder="비밀번호"
                      name="password"
                      type="text"
                      className="mt-6"
                      required
                    />
                    <DialogFooter>
                      <Button
                        type="submit"
                        variant="destructive"
                        className="mt-4"
                      >
                        확인
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            <Dialog
              open={openCommentDialog}
              onOpenChange={setOpenCommentDialog}
            >
              <DialogTrigger asChild>
                <Button onClick={() => setCommentId(null)}>댓글 작성</Button>
              </DialogTrigger>
              <DialogContent>
                <CommentForm handleSubmit={handleCommentSubmit} />
              </DialogContent>
            </Dialog>
          </div>

          <div className="mt-11 mb-2 text-sm">댓글</div>

          {/* 댓글 목록 */}
          {commentList.map((content) => {
            return (
              <div key={content.commentId} className="mb-6">
                <div className="flex flex-row mb-2">
                  <div className="text-xs">@</div>
                  <div className="text-xs font-bold">{content.creator}</div>
                  <div className="text-gray-500 text-xs ml-1">
                    {content.createdAt
                      ? convertDateFormat(content.createdAt)
                      : "알 수 없음"}
                  </div>
                </div>

                <p className="text-base">{content.content}</p>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      onClick={() => setCommentId(content.commentId)}
                      variant="ghost"
                      size="sm"
                      className="text-xs font-bold"
                    >
                      답글
                    </Button>
                  </DialogTrigger>

                  <DialogContent>
                    <CommentForm
                      handleSubmit={handleCommentSubmit}
                      // setComment={setComment}
                      // comment={comment}
                    />
                  </DialogContent>
                </Dialog>

                {/* 대댓글 목록 */}
                {/* {content.children.map((reply: any) => {
                      return (
                        <div key={reply.commentId} className="ml-6 my-2">
                          <Separator className="my-2" />
                          <div className="flex justify-between">
                            <div className="text-sm text-gray-500">
                              {reply.creator}
                            </div>
                            <div className="text-sm text-gray-500 mb-4 text-xs">
                              {reply.createdAt
                                ? convertDateFormat(reply.createdAt)
                                : "알 수 없음"}
                            </div>
                          </div>

                          <p className="text-gray-800">{reply.content}</p>
                        </div>
                      );
                    })} */}
              </div>
            );
          })}

          <Drawer open={openUpdateDrawer} onOpenChange={setOpenUpdateDrawer}>
            <DrawerContent className="max-h-[84%]">
              <form
                onSubmit={handleUpdate}
                className="p-10 overflow-auto mx-auto w-full max-w-[767px]"
              >
                <div className="text-slate-400 text-xs mb-1 ml-1">카테고리</div>
                <Select name="category" defaultValue={postContent.category}>
                  <SelectTrigger className="mb-4 data-[placeholder]:text-slate-400">
                    <SelectValue placeholder="선택해 주세요" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>카테고리</SelectLabel>
                      <SelectItem value="ad">홍보</SelectItem>
                      <SelectItem value="question">질문</SelectItem>
                      <SelectItem value="consulting">상담</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>

                <div className="text-slate-400 text-xs mb-1 ml-1">제목</div>
                <Input
                  defaultValue={postContent.title}
                  name="title"
                  type="text"
                  className="mb-4"
                  required
                />

                <ContentEditor
                  onEditContent={onEditContent}
                  defaultValue={postContent.content}
                />
                <DialogFooter>
                  <Button type="submit" className="mt-4">
                    완료
                  </Button>
                </DialogFooter>
              </form>
            </DrawerContent>
          </Drawer>
        </div>
      </SheetContent>
    </Sheet>
  );
}
