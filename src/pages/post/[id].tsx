import { Card } from "@/components/ui/card";
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
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { Dispatch, FormEvent, SetStateAction, useRef, useState } from "react";
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
  const [comment, setComment] = useState("");
  const [openUpdateDrawer, setOpenUpdateDrawer] = useState(false);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);

  const router = useRouter();
  const { postContent, removePost, getToken, updatePost, onEditContent } =
    usePostManager(data, setOpenUpdateDrawer);
  const { commentList } = useCommentManager(data);

  const commentId = useRef<Number | null>(null);
  const token = useRef<string | null>(null);

  const handleCommentSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const requestParams = getParamsFromFormData(new FormData(e.currentTarget));

    fetch("/api/comment", {
      method: "POST",
      body: JSON.stringify({
        postId: data.postId,
        content: comment,
        ...requestParams,
        parentId: commentId.current,
      }),
    }).then(async (res) => {
      const { success } = await res.json();
      if (success) {
        router.reload();
      }
    });
  };

  const getParamsFromFormData = (formData: FormData) => {
    let currentParams: { [key: string]: any } = {};

    formData.forEach((value, index) => {
      currentParams[index] = value;
    });

    return currentParams;
  };

  const setCommentId = (id: Number | null) => {
    commentId.current = id;
  };

  const handleRemove = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const params = getParamsFromFormData(new FormData(e.currentTarget));

    removePost({
      password: params.password,
      postId: data.postId,
    });
  };

  const handleUpdate = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const params = getParamsFromFormData(new FormData(e.currentTarget));

    updatePost({
      ...params,
      postId: data.postId,
      token: token.current,
      creator: data.creator,
    });
  };

  const checkUser = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const params = getParamsFromFormData(new FormData(e.currentTarget));

    getToken({
      password: params.password,
      postId: data.postId,
    }).then((value) => {
      token.current = value;

      setOpenUpdateDialog(false);
      setOpenUpdateDrawer(true);
    });
  };

  return (
    <Sheet open={isOpen} onOpenChange={setOpen}>
      <SheetContent className="w-[400px] sm:w-[540px] sm:min-w-[1200px]">
        <div className="h-20 flex items-center justify-center">
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
              <Dialog
                open={openUpdateDialog}
                onOpenChange={setOpenUpdateDialog}
              >
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

            <Dialog>
              <DialogTrigger asChild>
                <Button onClick={() => setCommentId(null)}>댓글 작성</Button>
              </DialogTrigger>
              <DialogContent>
                <CommentForm
                  handleSubmit={handleCommentSubmit}
                  setComment={setComment}
                  comment={comment}
                />
              </DialogContent>
            </Dialog>
          </div>

          <div className="mt-11 mb-2 text-slate-400 text-sm">댓글</div>

          {/* 댓글 목록 */}
          {commentList.map((content) => {
            return (
              <Card key={content.commentId} className="p-6 mb-1">
                <div className="flex justify-between">
                  <div className="text-sm text-gray-500">{content.creator}</div>
                  <div className="text-sm text-gray-500 mb-4 text-xs">
                    {content.createdAt
                      ? convertDateFormat(content.createdAt)
                      : "알 수 없음"}
                  </div>
                </div>

                <p className="text-gray-800">{content.content}</p>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      onClick={() => setCommentId(content.commentId)}
                      variant="secondary"
                      size="icon"
                    >
                      답글
                    </Button>
                  </DialogTrigger>

                  <DialogContent>
                    <CommentForm
                      handleSubmit={handleCommentSubmit}
                      setComment={setComment}
                      comment={comment}
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
              </Card>
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
