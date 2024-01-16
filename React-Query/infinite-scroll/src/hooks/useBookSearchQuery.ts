import { useInfiniteQuery } from "@tanstack/react-query";
import { getBookData } from "../util/http";

export const useBookSearhQuery = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: ["books"],
      queryFn: ({ pageParam = 1 }) => getBookData({ pageParam }),
      initialPageParam: 1,
      getNextPageParam: (lastPage, pages) => {
        const nextPage = pages.length + 1;
        return lastPage.docs.length === 0 ? undefined : nextPage;
      },
    });

  return { data, fetchNextPage, hasNextPage, isFetchingNextPage, status };
};
