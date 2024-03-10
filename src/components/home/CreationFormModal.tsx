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

import { usePassword } from "@/hooks/post/usePassword";
import { useSubmit } from "@/hooks/post/useSubmit";

import dynamic from "next/dynamic";
import Image from "next/image";

const ContentEditor = dynamic(() => import("../common/ContentEditor"), {
  ssr: false,
});

export const CreationFormModal = () => {
  const { onSubmit, onEditContent } = useSubmit();

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button
          variant="default"
          style={{
            backgroundColor: "#FFF",
            padding: "8px 15px",
            borderRadius: "50px",
            color: "#000",
          }}
        >
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
            글쓰기
          </h4>
          <Image
            src={require("../../../assets/image/note_stack_add.png")}
            alt="buttonImage"
            style={{ width: "24px", height: "24px", marginLeft: "4px" }}
          />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="max-h-[84%]">
        <form
          onSubmit={onSubmit}
          className="p-10 overflow-auto mx-auto w-full max-w-[767px]"
        >
          <CreationForm onEditContent={onEditContent} />

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

// /* feed-write-btn */

// /* Auto layout */
// display: flex;
// flex-direction: row;
// justify-content: center;
// align-items: center;
// padding: 8px 15px;
// gap: 5px;

// margin: 0 auto;
// width: 114px;
// height: 44px;

// /* slate-50 */
// background: #F8FAFC;
// border-radius: 50px;

// /* Inside auto layout */
// flex: none;
// order: 1;
// flex-grow: 0;

const CreationForm = ({
  onEditContent,
}: {
  onEditContent: ({
    isEmpty,
    content,
  }: {
    isEmpty: boolean;
    content: string;
  }) => void;
}) => {
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

      <ContentEditor onEditContent={onEditContent} />
    </>
  );
};
