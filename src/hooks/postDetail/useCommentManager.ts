import { Board } from "@/pages/api/postList";
import { getParamsFromFormData } from "@/utils/common";
import { Dispatch, FormEvent, SetStateAction, useRef, useState } from "react";

export const useCommentManager = (
  data: Board & { comments: any[] },
  setOpenCommentDialog: Dispatch<SetStateAction<boolean>>
) => {
  const [commentList, setCommentList] = useState(data.comments);

  const commentId = useRef<number | null>(null);
  const pageNumber = useRef<number>(1);
  const pageSize = useRef<number>(10);

  const getCommentList = async () => {
    pageNumber.current = pageNumber.current + 1;

    const response = await fetch(
      `/api/v1/post/${data.postId}/comment?page=${pageNumber.current}&size=${pageSize.current}`,
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
      pageNumber.current = 0;

      await getCommentList();
      setOpenCommentDialog(false);
    }
  };

  const setCommentId = (id: number | null) => {
    commentId.current = id;
  };

  return { commentList, setCommentId, handleCommentSubmit };
};
