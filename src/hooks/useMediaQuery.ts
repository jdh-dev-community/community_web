import { useEffect, useState } from "react";

export const useMediaQuery = (query: string) => {
  const [isMatch, setMatch] = useState<boolean>(
    window.matchMedia(query).matches
  );

  useEffect(() => {
    const matchMedia = window.matchMedia(query);

    matchMedia.addEventListener("change", observeMedia);

    return () => {
      matchMedia.removeEventListener("change", observeMedia);
    };
  }, [query]);

  const observeMedia = () => {
    setMatch(window.matchMedia(query).matches);
  };

  return isMatch;
};
