import { useSubmit } from "@/hooks/post/useSubmit";

export default function PostPage() {
  const { onSubmit } = useSubmit();

  return (
    <form onSubmit={onSubmit}>
      <div>닉네임</div>
      <input type="text" name="creator" required />

      <div>카테고리</div>
      <select name="category" className="text-black">
        <option value="concern" selected>
          고민
        </option>
        <option value="question">질문</option>
        <option value="daily">일상</option>
      </select>

      <div>제목</div>
      <input type="text" name="title" required />

      <div>내용</div>
      <input type="text" name="content" required />

      <div>비밀번호</div>
      <input
        type="text"
        name="password"
        pattern="\S{4,}"
        placeholder="4자 이상 입력해주세요"
        required
      />

      <button type="submit">Submit</button>
    </form>
  );
}
