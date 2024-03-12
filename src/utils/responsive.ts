export const isMobileScreenWithException = () => {
  if (typeof window === "undefined") {
    throw new Error("윈도우 객체가 없습니다.");
  }
  const width = window.innerWidth;
  return width < 1024;
};
