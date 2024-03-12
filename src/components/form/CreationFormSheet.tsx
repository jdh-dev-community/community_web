import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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

import _ from "lodash";
import dynamic from "next/dynamic";
import Image from "next/image";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";

import { useState } from "react";
import noteAdd from "../../../assets/images/noteAdd@x3.png";
import { POST_CATEGORY_DEF } from "@/constants/posts";
import { TextLogo } from "../parts/TextLogo";

const ContentEditor = dynamic(() => import("../common/ContentEditor"), {
  ssr: false,
});

export const CreationFormSheet = () => {
  const [openSheet, setOpenSheet] = useState(false);
  const { onSubmit, onEditContent } = useSubmit();
  const { isVisiblePassword, handleCheckBox } = usePassword();

  return (
    <Sheet open={openSheet} onOpenChange={setOpenSheet}>
      <SheetTrigger asChild>
        <Button
          variant="default"
          className="rounded-[50px] bg-white w-[114px] h-[36px] lg:h-[44px] hover:bg-white"
        >
          <h4 className="text-slate-700 mr-[5px] text-md lg:text-lg font-semibold tracking-tight">
            글쓰기
          </h4>

          <Image src={noteAdd} alt={""} width={24} height={24} />
        </Button>
      </SheetTrigger>

      <SheetContent className="w-full min-w-[58%] sm:max-w-[761px] overflow-auto p-0">
        <TextLogo containerStyle="max-w-[761px] pl-[20px]" />

        <form
          onSubmit={onSubmit}
          className="p-[20px] pt-[20px] overflow-auto mx-auto w-full max-w-[761px]"
        >
          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
            피드 작성하기
          </h3>

          <div className="text-slate-400 text-xs mt-[20px] mb-[5px] ml-[3px]">
            카테고리
          </div>

          <Select name="category">
            <SelectTrigger className="mb-4 data-[placeholder]:text-slate-400">
              <SelectValue placeholder="카테고리를 선택해 주세요" />
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                <SelectLabel>카테고리</SelectLabel>
                {[
                  _.entries(POST_CATEGORY_DEF).map(([key, value]) => {
                    return (
                      <SelectItem key={key} value={key}>
                        {value.word}
                      </SelectItem>
                    );
                  }),
                ]}
              </SelectGroup>
            </SelectContent>
          </Select>

          <div className="text-slate-400 text-xs mt-[20px] mb-[5px] ml-[3px]">
            제목
          </div>
          <Input
            type="text"
            name="title"
            className="mb-4 placeholder:text-slate-400"
            placeholder="제목을 입력해주세요"
            required
          />

          <div className="text-slate-400 text-xs mt-[20px] mb-[5px] ml-[3px]">
            컨텐츠
          </div>
          <ContentEditor onEditContent={onEditContent} />

          <div className="text-slate-400 text-xs mt-[20px] mb-[5px] ml-[3px]">
            닉네임
          </div>
          <Input
            className="mb-4 placeholder:text-slate-400"
            placeholder="닉네임을 입력해주세요"
            type="text"
            name="creator"
            required
          />

          <div className="text-slate-400 text-xs mt-[20px] mb-[5px] ml-[3px]">
            비밀번호
          </div>
          <Input
            className="mb-[10px] placeholder:text-slate-400"
            type={isVisiblePassword ? "text" : "password"}
            name="password"
            pattern="\S{4,}"
            placeholder="비밀번호를 입력해주세요 (4글자 이상 입력해주세요)"
            required
          />
          <div className="flex items-center">
            <Checkbox id="terms" onCheckedChange={handleCheckBox} />
            <label
              htmlFor="terms"
              className="text-xs ml-[5px] text-slate-600 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              비밀번호 보기
            </label>
          </div>

          <div className="flex items-center justify-center mt-[178px] mb-[40px]">
            <Button
              variant="outline"
              className="w-[135px] md:w-[280px] h-[32px] md:h-[60px] text-sm"
              onClick={() => setOpenSheet(false)}
            >
              취소
            </Button>

            <Button
              type="submit"
              className="w-[135px] md:w-[280px] h-[32px] md:h-[60px] ml-[20px] text-sm"
            >
              작성하기
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
};
