import { FormEvent } from "react";

export const useSubmit = () => {
  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    createPost(formData);
  };

  const createPost = async (formData: FormData) => {
    const body = getJsonFromData(formData);

    await fetch("http://3.36.204.107/post", {
      method: "POST",
      body: body,
    });
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
