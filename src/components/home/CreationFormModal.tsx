import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import { usePassword } from "@/hooks/post/usePassword";
import { useSubmit } from "@/hooks/post/useSubmit";

export const CreationFormModal = () => {
  const { onSubmit } = useSubmit();

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="default">글 작성하기</Button>
      </DrawerTrigger>
      <DrawerContent className="max-h-[84%]">
        <form
          onSubmit={onSubmit}
          className="p-10 overflow-auto mx-auto w-full max-w-[767px]"
        >
          <CreationForm />

          <DrawerFooter className="flex flex-row justify-end">
            <DrawerClose asChild>
              <Button variant="outline" className="w-20">
                취소
              </Button>
            </DrawerClose>

            <Button type="submit" className="w-20">
              등록
            </Button>
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Drawer>
  );
};

const CreationForm = () => {
  const { isVisiblePassword, handleCheckBox } = usePassword();

  return (
    <>
      <div className="text-slate-400 text-xs mb-1 ml-1">닉네임</div>
      <Input className="mb-4" type="text" name="creator" required />

      <div className="text-slate-400 text-xs mb-1 ml-1">비밀번호</div>
      <Input
        className="mb-2 placeholder:text-slate-400"
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

      <div className="text-slate-400 text-xs mb-1 ml-1">카테고리</div>

      <Select name="category">
        <SelectTrigger className="mb-4 data-[placeholder]:text-slate-400">
          <SelectValue placeholder="선택해 주세요" />
        </SelectTrigger>

        <SelectContent>
          <SelectGroup>
            <SelectLabel>카테고리</SelectLabel>
            <SelectItem value="ad">홍보</SelectItem>
            <SelectItem value="question">질문</SelectItem>
            <SelectItem value="consulting">상담</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <div className="text-slate-400 text-xs mb-1 ml-1">제목</div>
      <Input type="text" name="title" className="mb-4" required />

      <Textarea
        className="placeholder:text-slate-400 min-h-52"
        name="content"
        placeholder="내용을 입력해주세요"
        required
      />
    </>
  );
};
