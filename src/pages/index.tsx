import { MainCard } from "@/components/card";
import { Header } from "@/components/header";
import { SortingButtons } from "@/components/home";
import { NEWEST } from "@/components/home/SortButton";
import { Button } from "@/components/ui/button";
import { GetServerSideProps } from "next";
import { Inter } from "next/font/google";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { Board } from "./api/postList";

const inter = Inter({ subsets: ["latin"] });
const PAGE_SIZE = 8;

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

  const target = useRef<HTMLDivElement>(null);

  const route = useRouter();

  const fetchPostCards = async (currentPage: number) => {
    if (cards?.length === totalElement && currentPage !== 2) return;

    setLoading(true);
    if (isLoading) return;

    const response = await fetch(
      `/api/postList?page=${currentPage}&size=${PAGE_SIZE}&sortBy=${listSortType}`
    );

    const newCards = await response.json();

    setCards((prevCards) => [...prevCards, ...(newCards?.content ?? [])]);

    setLoading(false);
  };

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    fetchPostCards(page);
  }, [page, listSortType]);

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleClickSortType = (type: string) => {
    setListSortType(type);
    setPage(1);
  };

  useEffect(() => {
    let observer: IntersectionObserver;
    if (target) {
      observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            loadMore();
          }
        },
        { threshold: 0 }
      );
      observer.observe(target.current as Element);
    }
    return () => observer.disconnect();
  }, [target]);

  const goRoutePost = () => {
    route.push("/post");
  };

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
      style={{ backgroundColor: "#fff" }}
    >
      <Header />

      <div className="container mx-auto px-4">
        <div className="flex justify-between">
          <Button onClick={goRoutePost}>글 작성하기</Button>
          <SortingButtons
            currentType={listSortType}
            onClickButton={handleClickSortType}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {cards?.map((card, index) => (
            <MainCard key={index} {...card} />
          ))}
        </div>
        <div ref={target}>
          {isLoading && (
            <div
              style={{
                textAlign: "center",
                lineHeight: 5,
                fontSize: "2rem",
                border: "1px solid black",
                height: 200,
                background: "#eee",
              }}
            >
              Loading...
            </div>
          )}
        </div>
      </div>
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
