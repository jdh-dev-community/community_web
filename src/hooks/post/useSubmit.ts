import { useRouter } from "next/router";
import { FormEvent } from "react";

export const useSubmit = () => {
  const router = useRouter();

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    createPost(formData);
  };

  const createPost = async (formData: FormData) => {
    const body = getJsonFromData(formData);

    const res = await fetch("/api/post", {
      method: "POST",
      body: body,
    });

    const { result } = await res.json();

    if (result !== null) {
      router.replace(`/post/${result.postId}`);
    } else {
      // 팝업 UI 변경
      alert("글 작성 실패");
    }
  };

  // 이미지 추가할 때는 FormData를 사용해야 할 가능성 고려
  const getJsonFromData = (formData: FormData) => {
    let currentParams: { [key: string]: any } = {};

    formData.forEach((value, index) => {
      currentParams[index] = value;
    });

    return JSON.stringify(currentParams);
  };

  return { onSubmit };
};
