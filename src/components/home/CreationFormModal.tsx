import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { useBehavior } from "@/hooks/post/useBehavior";
import { useSubmit } from "@/hooks/post/useSubmit";

export const CreationFormModal = () => {
  const { isMobile, formValues, openForm, onChangeForm, setOpenForm } =
    useBehavior();
  const { onSubmit } = useSubmit();

  if (isMobile) {
    return (
      <Drawer open={openForm} onOpenChange={setOpenForm}>
        <DrawerTrigger asChild>
          <Button variant="default">글 작성하기</Button>
        </DrawerTrigger>
        <DrawerContent>
          <form onSubmit={onSubmit} className="p-10" onChange={onChangeForm}>
            <CreationForm formValues={formValues} />

            <DrawerFooter className="flex flex-row justify-end">
              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>

              <Button type="submit" className="w-20">
                등록
              </Button>
            </DrawerFooter>
          </form>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={openForm} onOpenChange={setOpenForm}>
      <DialogTrigger asChild>
        <Button variant="default">글 작성하기</Button>
      </DialogTrigger>

      <DialogContent>
        <form onSubmit={onSubmit} className="p-10" onChange={onChangeForm}>
          <CreationForm formValues={formValues} />

          <DialogFooter className="flex flex-row justify-end mt-4">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>

            <Button type="submit" className="w-20">
              등록
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

const CreationForm = ({
  formValues,
}: {
  formValues: { [key: string]: string };
}) => {
  return (
    <>
      <div className="text-slate-400 text-xs mb-1 ml-1">닉네임</div>
      <Input
        className="mb-4"
        type="text"
        name="creator"
        defaultValue={formValues?.creator ?? ""}
        required
      />

      <div className="text-slate-400 text-xs mb-1 ml-1">비밀번호</div>
      <Input
        className="mb-4 placeholder:text-slate-400"
        type="password"
        name="password"
        pattern="\S{4,}"
        placeholder="4자 이상 입력해주세요"
        defaultValue={formValues?.password ?? ""}
        required
      />

      <div className="text-slate-400 text-xs mb-1 ml-1">카테고리</div>

      <Select name="category" defaultValue={formValues?.category ?? ""}>
        <SelectTrigger className="mb-4 data-[placeholder]:text-slate-400">
          <SelectValue placeholder="선택해 주세요" />
        </SelectTrigger>

        <SelectContent>
          <SelectGroup>
            <SelectLabel>카테고리</SelectLabel>
            <SelectItem value="concern">고민</SelectItem>
            <SelectItem value="question">질문</SelectItem>
            <SelectItem value="daily">일상</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <div className="text-slate-400 text-xs mb-1 ml-1">제목</div>
      <Input
        type="text"
        name="title"
        className="mb-4"
        defaultValue={formValues?.title ?? ""}
        required
      />

      <Textarea
        className="placeholder:text-slate-400"
        name="content"
        placeholder="내용을 입력해주세요"
        defaultValue={formValues?.content ?? ""}
        required
      />
    </>
  );
};
