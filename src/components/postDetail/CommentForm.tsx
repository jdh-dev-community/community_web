import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { colors } from "@/styles/theme";
import { FormEvent } from "react";

interface Props {
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  setComment: (comment: string) => void;
  comment: string;
}

export const CommentForm = ({ handleSubmit, setComment, comment }: Props) => {
  return (
    <div className="p-10">
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
        <DialogFooter>
          <Button
            type="submit"
            className="text-white rounded-md px-6 py-2 transition-colors"
            style={{ backgroundColor: colors.primary }}
          >
            등록
          </Button>
        </DialogFooter>
      </form>
    </div>
  );
};
