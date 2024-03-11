"use-client";
import { MainCard } from "@/components/card";
import { Header } from "@/components/header";
import { NEWEST } from "@/components/home/SortButton";
import { Inter } from "next/font/google";
import { forwardRef, useCallback, useEffect, useRef, useState } from "react";
import { Board } from "./api/postList";
import { PostDetail2 } from "@/components/postDetail/PostDetail";

const inter = Inter({ subsets: ["latin"] });

const PAGE_SIZE = 16;

export default function Home() {
  const [cards, setCards] = useState<Board[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [listSortType, setListSortType] = useState(NEWEST);
  const observer = useRef<IntersectionObserver | null>(null);
  const hasMoreContent = useRef(true);
  const totalElement = useRef(null);

  const [detailData, setDetailData] = useState(null);

  const target: any = useCallback(
    (node: HTMLElement) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      });

      if (node) observer.current.observe(node);
    },
    [isLoading]
  );

  const fetchPostCards = async (currentPage: number, isReset: boolean) => {
    if (
      (totalElement.current !== null &&
        cards?.length === totalElement.current) ||
      !hasMoreContent.current
    )
      return;

    setLoading(true);
    if (isLoading) return;

    const response = await fetch(
      `/api/postList?page=${currentPage}&size=${PAGE_SIZE}&sortBy=${listSortType}`
    );

    const newCards = await response.json();

    if (newCards?.content?.length < PAGE_SIZE) {
      hasMoreContent.current = false;
    }

    totalElement.current = newCards.elementsCount;
    if (isReset) {
      setCards(newCards?.content ?? []);
      handleClick(newCards?.content?.[0]?.postId);
    } else {
      setCards((prevCards) => [...prevCards, ...(newCards?.content ?? [])]);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchPostCards(page, page === 1);
  }, [page, listSortType]);

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleClick = async (id: number) => {
    if (id !== null) {
      const response = await fetch(`/api/post/${id}`);
      const data = await response.json();

      setDetailData(data);
    }
  };

  return (
    <main
      className={`flex max-h-screen flex-col items-center justify-between ${inter.className} overflow-hidden`}
      style={{
        backgroundColor: "#fff",
        margin: "0 auto",
      }}
    >
      <Header />
      <div
        className="flex justify-center mx-auto"
        style={{
          maxWidth: "1440px",
          width: "100%",
          paddingLeft: "40px",
          paddingRight: "40px",
        }}
      >
        <div
          className="flex overflow-y-scroll scrollbar-hide justify-center lg:min-w-[430px] h-[100vh] pt-[100px]"
          style={{ flex: 1.1 }}
        >
          <div className="grid grid-cols-1 gap-5 w-full ">
            {cards?.map((card, index) => {
              if (index === cards?.length - 1) {
                return (
                  <div key={index.toString()} ref={target}>
                    <MainCard key={index} {...card} onClick={handleClick} />
                    <div className="h-[80px]" />
                  </div>
                );
              }

              return (
                <div key={index.toString()}>
                  <MainCard key={index} {...card} onClick={handleClick} />
                </div>
              );
            })}
          </div>
        </div>

        {detailData !== null && (
          <>
            <div className="hidden lg:flex w-[28px]" />
            <div
              className="hidden lg:flex flex-grow overflow-y-scroll scrollbar-hide pt-[95px] pb-[15px]"
              style={{ flex: 1.9 }}
            >
              <PostDetail2
                className="w-full rounded-lg border bg-card text-card-foreground shadow-sm p-[40px]"
                detail={detailData}
              />
            </div>
          </>
        )}
      </div>
    </main>
  );
}
