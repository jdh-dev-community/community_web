import { Card } from "@/components/ui/card";
import { colors } from "@/styles/theme";
import { convertDateFormat } from "@/utils/dateUtils";
import { GetServerSideProps } from "next";

import { CommentForm } from "@/components/postDetail/CommentForm";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/router";
import { FormEvent, useRef, useState } from "react";
import { Board } from "../api/postList";

export default function PostDetail({
  data,
}: {
  data: Board & { comments: any[] };
}) {
  const router = useRouter();

  const [comment, setComment] = useState("");
  const commentId = useRef<Number | null>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
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

  return (
    <div className="min-h-screen bg-white">
      <div
        className="h-40 flex items-center justify-center"
        style={{ backgroundColor: colors.primary }}
      />

      <div className="bg-white">
        <div className="h-20 flex items-center justify-center">
          <h1 className="text-black text-3xl">{data.title}</h1>
        </div>

        {/* 카드 형식의 컨텐츠 */}
        <div className="max-w-2xl mx-auto p-5">
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
                <Button onClick={() => setCommentId(null)}>댓글 작성</Button>
              </DialogTrigger>
              <DialogContent>
                <CommentForm
                  handleSubmit={handleSubmit}
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
                      handleSubmit={handleSubmit}
                      setComment={setComment}
                      comment={comment}
                    />
                  </DialogContent>
                </Dialog>

                {/* 대댓글 목록 */}
                {content.children.map((reply: any) => {
                  return (
                    <div className="ml-6 my-2">
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
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.params?.id as string;
  const response = await fetch(`http://3.36.204.107/api/v1/post/${id}`);
  const data = await response.json();

  return {
    props: {
      data,
    },
  };
};
