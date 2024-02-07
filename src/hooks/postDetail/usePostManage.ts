import { useRouter } from "next/router";

export const usePostManage = () => {
  const router = useRouter();

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

    router.replace("/");
  };

  const updatePost = async (params: any) => {
    const { postId, token, ...body } = params;

    const res = await fetch(`/api/post/${postId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ ...body, postId }),
    });
    const { success } = await res.json();

    if (success) {
      router.reload();
    }
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

  return { removePost, getToken, updatePost };
};
