import { useSubmit } from "@/hooks/post/useSubmit";

export default function PostPage() {
  const { onSubmit } = useSubmit();

  return (
    <form onSubmit={onSubmit}>
      <div>닉네임</div>
      <input type="text" name="creator" />

      <div>카테고리</div>
      <select name="category" className="text-black">
        <option value="질문">질문</option>
        <option value="홍보">홍보</option>
        <option value="상담">질문</option>
      </select>

      <div>제목</div>
      <input type="text" name="title" />

      <div>내용</div>
      <input type="text" name="content" />

      <div>비밀번호</div>
      <input type="text" name="password" />

      <button type="submit">Submit</button>
    </form>
  );
}
