"use client";

import { catsArrayType, catType } from "@/lib/cats";
import { useState } from "react";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function ClientBreedsList({
  initialData,
  initialPage,
}: {
  initialData: catsArrayType;
  initialPage: number;
}) {
  const [page, setPage] = useState(initialPage);

  const { data: cats, error } = useSWR(
    `https://catfact.ninja/breeds?page=${page}`,
    fetcher,
    {
      fallbackData: { data: initialData },
    },
  );

  if (error) return <p>Error loading data</p>;
  if (!cats) return <p>Loading...</p>;
  const isLastPage = cats.current_page >= cats.last_page;

  return (
    <>
      <ul>
        {cats.data.map((breed: catType) => (
          <li key={breed.breed}>{breed.breed}</li>
        ))}
      </ul>

      <nav>
        {page > 1 && (
          <button className="cursor-pointer" onClick={() => setPage(page - 1)}>
            Previous
          </button>
        )}
        {!isLastPage && (
          <button
            className="pb-20 ml-3 cursor-pointer"
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        )}
      </nav>
    </>
  );
}
