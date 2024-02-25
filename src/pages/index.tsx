"use-client";
import { MainCard } from "@/components/card";
import { Header } from "@/components/header";
import { SortingButtons } from "@/components/home";
import { CreationFormModal } from "@/components/home/CreationFormModal";
import { NEWEST } from "@/components/home/SortButton";
import { GetServerSideProps } from "next";
import { Inter } from "next/font/google";
import { useRouter } from "next/router";
import { useCallback, useEffect, useRef, useState } from "react";
import { Board } from "./api/postList";
import PostDetail from "./post/[id]";

const inter = Inter({ subsets: ["latin"] });

const PAGE_SIZE = 16;

export default function Home({
  data,
  totalElement,
  initPageSize,
}: {
  data: Board[];
  totalElement: number;
  initPageSize: number;
}) {
  const firstRender = useRef(true);
  const [cards, setCards] = useState<Board[]>(data);
  const [isLoading, setLoading] = useState(false);
  const [page, setPage] = useState(initPageSize);
  const [listSortType, setListSortType] = useState(NEWEST);
  const observer = useRef<IntersectionObserver | null>(null);
  const hasMoreContent = useRef(true);

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

  const route = useRouter();

  const fetchPostCards = async (currentPage: number, isReset: boolean) => {
    if (cards?.length === totalElement && currentPage !== 2) return;
    if (!hasMoreContent.current) return;

    setLoading(true);
    if (isLoading) return;

    const response = await fetch(
      `/api/postList?page=${currentPage}&size=${PAGE_SIZE}&sortBy=${listSortType}`
    );

    const newCards = await response.json();

    if (newCards?.content?.length < PAGE_SIZE) {
      hasMoreContent.current = false;
    }

    if (isReset) {
      setCards(newCards?.content ?? []);
    } else {
      setCards((prevCards) => [...prevCards, ...(newCards?.content ?? [])]);
    }

    setLoading(false);
  };

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

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
      className={`flex min-h-screen flex-col items-center justify-between p-4 pt-20 sm:p-8 md:p-12 lg:p-24 ${inter.className}`}
      style={{ backgroundColor: "#fff" }}
    >
      <Header />

      <div className="container mx-auto px-2 sm:px-4 pt-5">
        <div className="flex sm:flex-row justify-between">
          <CreationFormModal />
          <SortingButtons
            currentType={listSortType}
            onClickButton={handleClickSortType}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 mt-4">
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

      {detailData !== null && (
        <PostDetail data={detailData} isOpen={open} setOpen={setOpen} />
      )}
    </main>
  );
}

export const getServerSideProps = (async () => {
  const response = await fetch(
    `http://3.36.204.107/api/v1/post/?page=1&size=${PAGE_SIZE}&sortBy=${NEWEST}`
  );
  const data = await response.json();

  return {
    props: {
      data: data?.content ?? [],
      totalElement: data?.elementCount ?? 0,
      initPageSize: 1,
    },
  };
}) satisfies GetServerSideProps<{
  data: Board[];
  totalElement: number;
  initPageSize: number;
}>;
