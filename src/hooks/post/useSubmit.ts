import { isMobileScreenWithException } from "@/utils/responsive";
import { useRouter } from "next/router";
import { FormEvent, useRef } from "react";

export const useSubmit = () => {
  const router = useRouter();
  const editedContent = useRef<string>("");

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (editedContent.current.length === 0) {
      alert("내용을 작성해 주세요");
      return;
    }

    const formData = new FormData(event.currentTarget);

    const isSuccess = await createPost(formData);

    if (isSuccess) {
      handleSuccessPost();
    } else {
      // 팝업 UI 변경
      alert("글 작성 실패");
    }
  };

  const createPost = async (formData: FormData) => {
    const body = getJsonFromData(formData);

    const res = await fetch("/api/v1/post", {
      method: "POST",
      body: body,
    });

    const { result } = await res.json();
    return result !== null;
  };

  const handleSuccessPost = () => {
    const isMobile = isMobileScreenWithException();
    const isHome = router.pathname === "/";

    if (isMobile && !isHome) {
      router.push("/");
    } else {
      router.reload();
    }
  };

  // 이미지 추가할 때는 FormData를 사용해야 할 가능성 고려
  const getJsonFromData = (formData: FormData) => {
    let currentParams: { [key: string]: any } = {
      content: editedContent.current,
    };

    formData.forEach((value, index) => {
      currentParams[index] = value;
    });

    return JSON.stringify(currentParams);
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

  return { onSubmit, onEditContent };
};
