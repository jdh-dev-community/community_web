"use-client";
import { MainCard } from "@/components/card";
import { Header } from "@/components/header";
import { SortingButtons } from "@/components/home";
import { CreationFormModal } from "@/components/home/CreationFormModal";
import { NEWEST } from "@/components/home/SortButton";
import { Inter } from "next/font/google";
import { useCallback, useEffect, useRef, useState } from "react";
import { Board } from "./api/postList";
import PostDetail from "./post/[id]";

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
  const [open, setOpen] = useState(false);

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
      setDetailData(newCards?.content?.[0] ?? null);
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

  const handleClickSortType = (type: string) => {
    setListSortType(type);
    setPage(1);
  };

  const handleClick = async (id: number) => {
    const response = await fetch(`/api/post/${id}`);
    const data = await response.json();

    setDetailData(data);
    setOpen(true);
  };

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between sm:pt-8 md:pt-12 ${inter.className} scrollbar-hide`}
      style={{
        backgroundColor: "#fff",
        maxWidth: "1920px",
        margin: "0 auto",
      }}
    >
      <Header />
      <div
        className="flex justify-center mx-auto h-screen "
        style={{
          maxWidth: "1920px",
          width: "100%",
        }}
      >
        <div className="flex overflow-auto scrollbar-hide mt-6 sm:mt-0">
          <div className="container mx-auto px-2 pt-5">
            <div className="grid grid-cols-1 gap-2 mt-10">
              {cards?.map((card, index) => {
                if (index === cards?.length - 1) {
                  return (
                    <div key={index.toString()} ref={target}>
                      <MainCard key={index} {...card} onClick={handleClick} />
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
        </div>

        {detailData !== null && (
          <div
            className="hidden md:flex flex-grow overflow-auto scrollbar-hide mt-6 sm:mt-0"
            style={{ flex: 1 }}
          >
            <PostDetail data={detailData} isOpen={true} setOpen={setOpen} />
          </div>
        )}
      </div>
    </main>
  );
}
