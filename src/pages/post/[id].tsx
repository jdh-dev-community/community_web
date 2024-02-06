import { Input } from "@/components/ui/input";
import { colors } from "@/styles/theme";
import { convertDateFormat } from "@/utils/dateUtils";
import { GetServerSideProps } from "next";
import { FormEvent, useState } from "react";
import { Board } from "../api/postList";

export default function PostDetail({
  data,
}: {
  data: Board & { comments: any[] };
}) {
  const [comment, setComment] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const requestParams = getParamsFromFormData(new FormData(e.currentTarget));

    fetch("/api/comment", {
      method: "POST",
      body: JSON.stringify({
        postId: data.postId,
        content: comment,
        ...requestParams,
      }),
    }).then(async (res) => {
      const { success } = await res.json();
      if (success) setComment("");
    });
  };

  const getParamsFromFormData = (formData: FormData) => {
    let currentParams: { [key: string]: any } = {};

    formData.forEach((value, index) => {
      currentParams[index] = value;
    });

    return currentParams;
  };

  return (
    <div className="min-h-screen bg-white">
      <div
        className="h-40 flex items-center justify-center"
        style={{ backgroundColor: colors.primary }}
      />

      <div className="bg-white">
        <div className="h-20 flex items-center justify-center">
          <h1 className="text-black text-3xl">{data.title}</h1>
        </div>

        {/* 카드 형식의 컨텐츠 */}
        <div className="max-w-2xl mx-auto p-5">
          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <div className="text-sm text-gray-500 mb-2">
              작성자 : {data.creator} | 조회수: {data.viewCount} | 카테고리:{" "}
              {data.category}
            </div>
            <div className="text-sm text-gray-500 mb-4">
              작성일 :
              {data.createdAt
                ? convertDateFormat(data.createdAt)
                : "알 수 없음"}
            </div>
            <p className="text-gray-800">{data.content}</p>
          </div>

          {/* 댓글 작성 부분 */}
          <div className="mt-10">
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
              <Input type="text" name="creator" placeholder="작성자" required />
              <Input
                type="text"
                name="password"
                pattern="\S{4,}"
                placeholder="비밀번호 (4자 이상 입력해주세요)"
                required
              />

              <textarea
                className="p-4 h-40 resize-none rounded-md border-2 border-gray-200 focus:outline-none"
                placeholder="댓글을 작성하세요..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
              ></textarea>
              <button
                type="submit"
                className="text-white rounded-md px-6 py-2 transition-colors"
                style={{ backgroundColor: colors.primary }}
              >
                댓글 작성
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.params?.id as string;
  const response = await fetch(`http://3.36.204.107/api/v1/post/${id}`);
  const data = await response.json();

  return {
    props: {
      data,
    },
  };
};
