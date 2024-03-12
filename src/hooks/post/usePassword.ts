import { useState } from "react";

export const usePassword = () => {
  const [isVisiblePassword, setVisiblePassword] = useState<boolean>(false);

  const handleCheckBox = (isChecked: boolean) => {
    setVisiblePassword(isChecked);
  };

  return { isVisiblePassword, handleCheckBox };
};
