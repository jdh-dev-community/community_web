import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { usePassword } from "@/hooks/post/usePassword";

import { FormEvent } from "react";

interface Props {
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

export const CommentForm = ({ handleSubmit }: Props) => {
  const { isVisiblePassword, handleCheckBox } = usePassword();

  return (
    <div className="p-10">
      <form onSubmit={handleSubmit} className="flex flex-col">
        <div className="text-slate-400 text-xs mb-1 ml-1">닉네임</div>
        <Input className="mb-4" type="text" name="creator" required />
        <div className="text-slate-400 text-xs mb-1 ml-1">비밀번호</div>
        <Input
          className="mb-4 placeholder:text-slate-400"
          type={isVisiblePassword ? "text" : "password"}
          name="password"
          pattern="\S{4,}"
          placeholder="4자 이상 입력해주세요"
          required
        />
        <div className="flex items-center mb-4 ml-1">
          <Checkbox id="terms" onCheckedChange={handleCheckBox} />
          <label
            htmlFor="terms"
            className="text-xs ml-1 text-slate-600 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            비밀번호 보기
          </label>
        </div>

        <div className="text-slate-400 text-xs mb-1 ml-1">댓글</div>
        <Input className="mb-4" type="text" name="content" required />

        <DialogFooter>
          <Button type="submit" className="text-white rounded-md px-6 py-1">
            등록
          </Button>
        </DialogFooter>
      </form>
    </div>
  );
};
