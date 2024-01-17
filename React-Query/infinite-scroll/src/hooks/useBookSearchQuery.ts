import { useInfiniteQuery } from "@tanstack/react-query";
import { getBookData } from "../util/http";

export const useBookSearhQuery = (query: string) => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    error,
  } = useInfiniteQuery({
    queryKey: ["search", { query }],
    queryFn: ({ pageParam = 1 }) => getBookData({ query, pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      const nextPage = pages.length + 1;
      return lastPage.docs.length === 0 ? undefined : nextPage;
    },
  });

  return {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    error,
  };
};
