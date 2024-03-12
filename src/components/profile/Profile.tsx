import { FC } from "react";

interface Props {
  nickname: string;
  imageStyle?: string;
  textStyle?: string;
}

export const Profile: FC<Props> = ({
  nickname,
  imageStyle = "",
  textStyle = "",
}) => {
  return (
    <div className="flex items-center">
      <div className={`bg-[#B667AE] rounded-[50%] mr-[5px] ${imageStyle}`} />
      <div className={`custom-font-p  ${textStyle}`}>{nickname}</div>
    </div>
  );
};
