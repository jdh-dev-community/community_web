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
import _ from "lodash";

import dynamic from "next/dynamic";
import { Sheet, SheetContent } from "../ui/sheet";

import { useToast } from "@/components/ui/use-toast";
import { POST_CATEGORY_DEF } from "@/constants/posts";
import { PostDetail_Response } from "@/types/api/postApi";
import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";

const ContentEditor = dynamic(() => import("../common/ContentEditor"), {
  ssr: false,
});

interface Props {
  openSheet: boolean;
  setOpenSheet: Dispatch<SetStateAction<boolean>>;
  postContent: PostDetail_Response;
  hasAuth: (password: string) => Promise<boolean>;
  handleRemove: (e: FormEvent<HTMLFormElement>) => void;
}

export const DeleteFormSheet = ({
  openSheet,
  setOpenSheet,
  postContent,
  hasAuth,
  handleRemove,
}: Props) => {
  const [disabledEdit, setDisabledEdit] = useState(true);

  const { isVisiblePassword, handleCheckBox } = usePassword();

  const { toast } = useToast();
  const password = useRef("");

  useEffect(() => {
    if (!openSheet) {
      setDisabledEdit(true);
    }
  }, [openSheet]);

  return (
    <Sheet open={openSheet} onOpenChange={setOpenSheet}>
      <SheetContent className="w-full min-w-[58%] sm:max-w-[761px] overflow-auto p-0">
        <div className="h-[88px] bg-slate-700 flex">
          <div className=" self-center text-slate-50 text-4xl font-extrabold tracking-tight mx-auto w-full max-w-[761px] pl-[20px]">
            Coconut
          </div>
        </div>

        <form
          onSubmit={handleRemove}
          className="p-[20px] pt-[20px] overflow-auto mx-auto w-full max-w-[761px] overflow-x-hidden"
        >
          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
            피드 삭제하기
          </h3>

          <div className="text-slate-400 text-xs mt-[20px] mb-[5px] ml-[3px]">
            카테고리
          </div>

          <Select name="category" defaultValue={postContent.category} disabled>
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
            defaultValue={postContent.title}
            disabled
            required
          />

          <div className="text-slate-400 text-xs mt-[20px] mb-[5px] ml-[3px]">
            컨텐츠
          </div>
          <ContentEditor
            onEditContent={() => {}}
            defaultValue={postContent.content}
            disabled
          />

          <div className="text-slate-400 text-xs mt-[20px] mb-[5px] ml-[3px]">
            닉네임
          </div>
          <Input
            className="mb-4 placeholder:text-slate-400"
            placeholder="닉네임을 입력해주세요"
            type="text"
            name="creator"
            required
            disabled
            defaultValue={postContent.creator}
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
            disabled={!disabledEdit}
            onChange={(e) => {
              password.current = e.target.value;
            }}
            required
          />

          <div className="flex flex-row justify-between">
            <div className="flex items-center">
              <Checkbox id="terms" onCheckedChange={handleCheckBox} />
              <label
                htmlFor="terms"
                className="text-xs ml-[5px] text-slate-600 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                비밀번호 보기
              </label>
            </div>

            <Button
              type="button"
              className="w-[80px] md:w-[135px] h-[26px] md:h-[32px] text-xs md:text-sm"
              disabled={!disabledEdit}
              onClick={async () => {
                if (password.current.length >= 4) {
                  const hasToken = await hasAuth(password.current);

                  // toast({

                  //   description: hasToken
                  //     ? "인증에 성공하셨습니다"
                  //     : "인증에 실패하였습니다",
                  // });

                  alert(
                    hasToken ? "인증에 성공하셨습니다" : "인증에 실패하였습니다"
                  );

                  setDisabledEdit(!hasToken);
                } else {
                  alert("비밀번호는 4글자 이상입니다");
                  // toast({
                  //   description: "Your message has been sent.",
                  // });
                }
              }}
            >
              인증하기
            </Button>
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
              variant="destructive"
              className="w-[135px] md:w-[280px] h-[32px] md:h-[60px] ml-[20px] text-sm"
              disabled={disabledEdit}
            >
              삭제하기
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
};
