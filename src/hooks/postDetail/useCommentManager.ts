import { BASE_COMMENT } from "@/types/api/commentApi";
import { PostDetail_Response } from "@/types/api/postApi";
import { getParamsFromFormData } from "@/utils/common";
import { Dispatch, FormEvent, SetStateAction, useRef, useState } from "react";

export const useCommentManager = (
  data: PostDetail_Response,
  setOpenCommentDialog: Dispatch<SetStateAction<boolean>>
) => {
  const [commentList, setCommentList] = useState(data.comments);
  const [reCommentList, setReCommentList] = useState<{
    [key: string]: BASE_COMMENT[];
  }>({});

  const commentId = useRef<number | null>(null);
  const commentNumber = useRef<number>(1);
  const reCommentPage = useRef<number>(1);
  const pageSize = useRef<number>(10);

  const getCommentList = async () => {
    const response = await fetch(
      `/api/v1/post/${data.postId}/comment?page=${commentNumber.current}&size=${pageSize.current}`,
      {
        method: "GET",
      }
    );

    const comments = await response.json();

    setCommentList(comments);
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
        reCommentPage.current = 1;
        await getReComment(commentId.current);
      } else {
        commentNumber.current = 1;
        await getCommentList();
      }

      setOpenCommentDialog(false);
    }
  };

  const setCommentId = (id: number | null) => {
    commentId.current = id;
  };

  const getReComment = async (commentId: number) => {
    const response = await fetch(
      `/api/v1/post/${data.postId}/comment/${commentId}?page=${reCommentPage.current}&size=${pageSize.current}`
    );

    const reComment = await response.json();

    reCommentPage.current = reCommentPage.current + 1;

    setReCommentList((prev) => {
      return { ...prev, [commentId]: reComment };
    });
  };

  return {
    commentList,
    reCommentList,
    setCommentId,
    handleCommentSubmit,
    getReComment,
  };
};
