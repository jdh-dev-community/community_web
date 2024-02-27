import { BASE_COMMENT } from "@/types/api/commentApi";
import { getParamsFromFormData } from "@/utils/common";
import { Dispatch, FormEvent, SetStateAction, useRef, useState } from "react";

export const useCommentManager = (
  data: any,
  setOpenCommentDialog: Dispatch<SetStateAction<boolean>>
) => {
  const [comments, setComments] = useState<{
    elementsCount: number;
    content: BASE_COMMENT[];
  }>(data.comments);
  const [reCommentList, setReCommentList] = useState<{
    [key: string]: { elementsCount: number; content: BASE_COMMENT[] };
  }>({});

  const commentId = useRef<number | null>(null);
  const commentNumber = useRef<number>(1);
  const reCommentPage = useRef<{
    [key: string]: number;
  }>({});
  const pageSize = useRef<number>(10);

  const getCommentList = async () => {
    commentNumber.current = commentNumber.current + 1;
    const response = await fetch(
      `/api/v1/post/${data.postId}/comment?page=${commentNumber.current}&size=${pageSize.current}`,
      {
        method: "GET",
      }
    );

    const currentComments = await response.json();

    setComments((prev) => {
      if (commentNumber.current === 1) {
        return currentComments;
      }

      return {
        elementsCount: currentComments.elementsCount,
        content: [...(prev?.content ?? []), ...currentComments.content],
      };
    });
  };

  const handleCommentSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const requestParams = getParamsFromFormData(new FormData(e.currentTarget));

    const res = await fetch(`/api/v1/post/${data.postId}/comment`, {
      method: "POST",
      body: JSON.stringify({
        ...requestParams,
        parentId: commentId.current,
      }),
    });

    const { success } = await res.json();

    if (success) {
      if (commentId.current) {
        reCommentPage.current = {
          ...reCommentPage.current,
          [commentId.current]: 1,
        };

        await getReComment(commentId.current);
      } else {
        commentNumber.current = 0;
        await getCommentList();
      }

      setOpenCommentDialog(false);
    }
  };

  const setCommentId = (id: number | null) => {
    commentId.current = id;
  };

  const getReComment = async (commentId: number) => {
    const page = reCommentPage.current[commentId] ?? 1;
    const response = await fetch(
      `/api/v1/post/${data.postId}/comment/${commentId}?page=${page}&size=${pageSize.current}`
    );

    const reComment = await response.json();

    reCommentPage.current = {
      ...reCommentPage.current,
      [commentId]: (reCommentPage.current[commentId] ?? 1) + 1,
    };

    setReCommentList((prev) => {
      if (prev[commentId] === undefined || page === 1) {
        return { ...prev, [commentId]: reComment };
      }

      return {
        ...prev,
        [commentId]: {
          content: [...prev[commentId].content, ...reComment.content],
          elementsCount: reComment.elementsCount,
        },
      };
    });
  };

  return {
    comments,
    reCommentList,
    setCommentId,
    handleCommentSubmit,
    getReComment,
    getCommentList,
  };
};
