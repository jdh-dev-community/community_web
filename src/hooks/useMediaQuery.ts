import { useEffect, useState } from "react";

export const useMediaQuery = (query: string) => {
  const [isMatch, setMatch] = useState<boolean>(false);

  useEffect(() => {
    const matchMedia = window.matchMedia(query);

    checkAndSetMatch();

    matchMedia.addEventListener("change", checkAndSetMatch);

    return () => matchMedia.removeEventListener("change", checkAndSetMatch);
  }, [query]);

  const checkAndSetMatch = () => {
    setMatch(window.matchMedia(query).matches);
  };

  return isMatch;
};
