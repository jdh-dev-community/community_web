import { Inter } from "next/font/google";
import { Header } from "@/components/header";
import { MainCard } from "@/components/card";
import { useEffect, useRef, useState } from "react";
import { MainCardInfo } from "@/components/card/MainCard";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [cards, setCards] = useState<MainCardInfo[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalContents, setTotalContents] = useState(0);
  const loader = useRef(null);

  const fetchPostCards = async () => {
    setLoading(true);

    const response = await fetch(`/api/postList?page=${page}&size=${8}`);

    const newCards = await response.json();

    setTotalContents(newCards.elementCount);
    console.log("newCards?.content :>> ", newCards?.content);
    setCards((prevCards) => [...prevCards, ...(newCards?.content ?? [])]);

    setPage((prevPage) => prevPage + 1);
    setLoading(false);
  };

  useEffect(() => {
    fetchPostCards();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && cards.length < totalContents) {
          fetchPostCards(); // 다음 페이지 데이터 로드
        }
      },
      { threshold: 0.5 }
    );

    return () => {
      observer.disconnect();
    };
  }, [cards, totalContents]);

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <Header />

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {cards.map((card, index) => (
            <MainCard key={index} {...card} />
          ))}
        </div>
        {isLoading && (
          <div ref={loader} className="loading">
            Loading...
          </div>
        )}
      </div>
    </main>
  );
}
