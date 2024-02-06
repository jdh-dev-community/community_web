import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useSubmit } from "@/hooks/post/useSubmit";
import { colors } from "@/styles/theme";

export default function PostPage() {
  const { onSubmit } = useSubmit();

  return (
    <Card className="p-4">
      <form onSubmit={onSubmit}>
        <div className="text-sm text-slate-500 mt-4">닉네임</div>
        <Input type="text" name="creator" required />

        <div className="text-sm text-slate-500 mt-4">카테고리</div>

        <Select name="category" defaultValue="concern">
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>

          <SelectContent>
            <SelectGroup>
              <SelectItem value="concern">고민</SelectItem>
              <SelectItem value="question">질문</SelectItem>
              <SelectItem value="daily">일상</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <div className="text-sm text-slate-500  mt-4">제목</div>
        <Input type="text" name="title" required />

        <div className="text-sm text-slate-500  mt-4">내용</div>
        <Textarea name="content" placeholder="내용을 입력해주세요" required />

        <div className="text-sm text-slate-500  mt-4">비밀번호</div>
        <Input
          type="text"
          name="password"
          pattern="\S{4,}"
          placeholder="4자 이상 입력해주세요"
          required
        />

        <Button
          type="submit"
          className="mt-4"
          style={{ backgroundColor: colors.primary }}
        >
          등록
        </Button>
      </form>
    </Card>
  );
}
