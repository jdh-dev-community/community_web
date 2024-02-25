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
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { usePostManage } from "@/hooks/postDetail/usePostManage";
import { useRouter } from "next/router";
import { Dispatch, FormEvent, SetStateAction, useRef, useState } from "react";
import { Board } from "../api/postList";

export default function PostDetail({
  data,
  isOpen,
  setOpen,
}: {
  data: Board & { comments: any[] };
  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const router = useRouter();
  const { removePost, getToken, updatePost } = usePostManage();

  const [comment, setComment] = useState("");
  const [openUpdateWindow, setOpenUpdateWindow] = useState(false);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);

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
      setOpenUpdateWindow(true);
    });
  };

  return (
    <Sheet open={isOpen} onOpenChange={setOpen}>
      <SheetContent>
        <div className="min-h-screen bg-white">
          <div className="bg-white">
            <div className="h-20 flex items-center justify-center">
              <h1 className="text-black text-3xl">{data.title}</h1>
            </div>

            {/* 카드 형식의 컨텐츠 */}
            <div className="max-w-2xl mx-auto p-5">
              <div className="flex justify-end mb-2">
                <Dialog
                  open={openUpdateDialog}
                  onOpenChange={setOpenUpdateDialog}
                >
                  <DialogTrigger asChild>
                    <Button variant="outline" className="ml-2">
                      수정
                    </Button>
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

              <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                <div className="text-sm text-gray-500 mb-2">
                  작성자 : {data.creator} | 조회수: {data.viewCount} | 카테고리:{" "}
                  {data.category}
                </div>
                <div className="text-sm text-gray-500 mb-4">
                  작성일 :
                  {data.createdAt
                    ? convertDateFormat(data.createdAt)
                    : "알 수 없음"}
                </div>
                <p className="text-gray-800">{data.content}</p>
              </div>

              <div className="flex justify-between mt-11 mb-2">
                <div className="self-end">댓글</div>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button onClick={() => setCommentId(null)}>
                      댓글 작성
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
              </div>

              {/* 댓글 목록 */}
              {data.comments.map((content) => {
                return (
                  <Card key={content.commentId} className="p-6 mb-1">
                    <div className="flex justify-between">
                      <div className="text-sm text-gray-500">
                        {content.creator}
                      </div>
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
                    {content.children.map((reply: any) => {
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
                    })}
                  </Card>
                );
              })}

              <Drawer
                open={openUpdateWindow}
                onOpenChange={setOpenUpdateWindow}
              >
                <DrawerContent>
                  <form onSubmit={handleUpdate}>
                    <div className="text-sm text-slate-500  mt-4">제목</div>
                    <Input
                      defaultValue={data.title}
                      name="title"
                      type="text"
                      required
                    />

                    <div className="text-sm text-slate-500 mt-4">카테고리</div>
                    <Select name="category" defaultValue={data.category}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="concern">고민</SelectItem>
                          <SelectItem value="question">질문</SelectItem>
                          <SelectItem value="daily">일상</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>

                    <div className="text-sm text-slate-500  mt-4">내용</div>
                    <Textarea
                      defaultValue={data.content}
                      name="content"
                      required
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
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
