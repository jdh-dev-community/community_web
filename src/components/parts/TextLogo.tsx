import { FC } from "react";

interface Props {
  containerStyle?: string;
}

export const TextLogo: FC<Props> = ({ containerStyle = "" }) => {
  return (
    <div className="h-[80px] bg-slate-700 flex">
      <div className={`self-center mx-auto w-full ${containerStyle}`}>
        <span className="text-slate-50 custom-font-h1">Coconut.</span>
      </div>
    </div>
  );
};
