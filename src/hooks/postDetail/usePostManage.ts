import { getParamsFromFormData } from "@/utils/common";
import { isMobileScreenWithException } from "@/utils/responsive";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useRef, useState } from "react";

export const usePostManager = (data: any) => {
  const [postContent, setPostContent] = useState(data);

  const router = useRouter();
  const editedContent = useRef<string>(data.content);
  const token = useRef<string | null>(null);

  useEffect(() => {
    setPostContent(data);
    editedContent.current = data.content;
    token.current = null;
  }, [data]);

  const handleRemove = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const params = getParamsFromFormData(new FormData(e.currentTarget));

    await hasAuth(params.password);

    await fetch(`/api/post/${data.postId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token.current}`,
      },
    });
    token.current = null;

    const isMobile = isMobileScreenWithException();
    if (isMobile) {
      router.push("/");
    } else {
      router.reload();
    }
  };

  const handleUpdate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (editedContent.current.length === 0) {
      alert("내용을 작성해 주세요");
      return false;
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

    if (res.ok) {
      const currentPost = await res.json();

      token.current = null;
      setPostContent(currentPost);
    }

    return res.ok;

    // setOpenUpdateDrawer(false);
  };

  const hasAuth = async (password: string) => {
    const response = await fetch("/api/post/token", {
      method: "POST",
      body: JSON.stringify({
        postId: postContent.postId,
        password,
      }),
    });

    if (response.ok) {
      const res = await response.json();
      console.log("res", res);
      token.current = res.token;
    }

    return response.ok;
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

  return {
    postContent,
    handleRemove,
    hasAuth,
    handleUpdate,
    onEditContent,
  };
};
