import { Inter } from "next/font/google";
import { Header } from "@/components/header";
import { MainCard } from "@/components/card";
import { useEffect, useRef, useState } from "react";
import { GetServerSideProps } from "next";
import { BoardList } from "./api/postList";

const inter = Inter({ subsets: ["latin"] });
const PAGE_SIZE = 8;

export default function Home({
  data,
  totalElement,
  initPageSize,
}: {
  data: BoardList[];
  totalElement: number;
  initPageSize: number;
}) {
  const [cards, setCards] = useState<BoardList[]>(data);
  const [isLoading, setLoading] = useState(false);
  const [page, setPage] = useState(initPageSize);

  const target = useRef<HTMLDivElement>(null);

  const fetchPostCards = async (currentPage: number) => {
    if (cards?.length === totalElement && currentPage !== 2) return;

    setLoading(true);
    if (isLoading) return;

    const response = await fetch(
      `/api/postList?page=${currentPage}&size=${PAGE_SIZE}`
    );

    const newCards = await response.json();

    setCards((prevCards) => [...prevCards, ...(newCards?.content ?? [])]);

    setLoading(false);
  };

  useEffect(() => {
    if (page === 1) return;

    fetchPostCards(page);
  }, [page]);

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
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

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <Header />

      <div className="container mx-auto px-4">
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
    `http://3.36.204.107/api/v1/post/?page=1&size=${PAGE_SIZE}`
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
  data: BoardList[];
  totalElement: number;
  initPageSize: number;
}>;
