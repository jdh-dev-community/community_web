import { useSubmit } from "@/hooks/post/useSubmit";

export default function PostPage() {
  const { onSubmit } = useSubmit();

  return (
    <form onSubmit={onSubmit}>
      <div>닉네임</div>
      <input type="text" name="creator" />

      <div>카테고리</div>
      <input type="text" name="category" />

      <div>제목</div>
      <input type="text" name="title" />

      <div>내용</div>
      <input type="text" name="content" />

      <button type="submit">Submit</button>
    </form>
  );
}
