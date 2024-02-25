import { Board } from "@/pages/api/postList";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useRef, useState } from "react";

export const usePostManager = (
  data: Board & { comments: any[] },
  setOpenUpdateDrawer: Dispatch<SetStateAction<boolean>>
) => {
  const [postContent, setPostContent] = useState(data);

  const router = useRouter();
  const editedContent = useRef<string>("");

  const removePost = async ({
    postId,
    password,
  }: {
    postId: number;
    password: string;
  }) => {
    const token = await getToken({ postId, password });

    await fetch(`/api/post/${postId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    router.reload();
  };

  const updatePost = async (params: any) => {
    if (editedContent.current.length === 0) {
      alert("내용을 작성해 주세요");
      return;
    }

    const { postId, token, ...body } = params;

    const res = await fetch(`/api/post/${postId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ ...body, postId, content: editedContent.current }),
    });
    const currentPost = await res.json();

    setPostContent(currentPost);
    setOpenUpdateDrawer(false);
  };

  const getToken = async ({
    postId,
    password,
  }: {
    postId: number;
    password: string;
  }) => {
    const response = await fetch("/api/post/token", {
      method: "POST",
      body: JSON.stringify({
        postId,
        password,
      }),
    });

    const res = await response.json();

    return res.token;
  };

  const onEditContent = ({
    isEmpty,
    content,
  }: {
    isEmpty: boolean;
    content: string;
  }) => {
    editedContent.current = isEmpty ? "" : content;
  };

  return { postContent, removePost, getToken, updatePost, onEditContent };
};
