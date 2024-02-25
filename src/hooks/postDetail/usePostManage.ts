import { PostDetail_Response } from "@/types/api/postApi";
import { getParamsFromFormData } from "@/utils/common";
import { useRouter } from "next/router";
import { Dispatch, FormEvent, SetStateAction, useRef, useState } from "react";

export const usePostManager = (
  data: PostDetail_Response,
  setOpenUpdateDrawer: Dispatch<SetStateAction<boolean>>
) => {
  const [postContent, setPostContent] = useState(data);

  const router = useRouter();
  const editedContent = useRef<string>("");
  const token = useRef<string | null>(null);

  const handleRemove = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const params = getParamsFromFormData(new FormData(e.currentTarget));

    await getToken({
      postId: data.postId,
      password: params.password,
    });

    await fetch(`/api/post/${data.postId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token.current}`,
      },
    });
    token.current = null;
    router.reload();
  };

  const handleUpdate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (editedContent.current.length === 0) {
      alert("내용을 작성해 주세요");
      return;
    }

    const params = getParamsFromFormData(new FormData(e.currentTarget));

    const res = await fetch(`/api/post/${data.postId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token.current}`,
      },
      body: JSON.stringify({
        ...params,
        creator: data.creator,
        postId: data.postId,
        content: editedContent.current,
      }),
    });
    const currentPost = await res.json();

    token.current = null;
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
    token.current = res.token;
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

  return { postContent, handleRemove, getToken, handleUpdate, onEditContent };
};
