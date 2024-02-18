import { useMediaQuery } from "./useMediaQuery";

export const useDevice = () => {
  const isMobile = useMediaQuery("(max-width: 767px)");

  return { isMobile };
};
