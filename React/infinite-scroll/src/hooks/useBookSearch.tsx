import { useEffect, useState } from "react";
import axios from "axios";
import { BookType } from "../type/bookType";

export const useBookSearch = (query: string, pageNumber: number) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [books, setBooks] = useState<string[]>([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setBooks([]);
  }, [query]);

  useEffect(() => {
    setLoading(true);
    setError(false);

    const controller = new AbortController();

    axios
      .get(
        `https://openlibrary.org/search.json?q=${query}&page=${pageNumber}`,
        {
          signal: controller.signal,
        }
      )
      .then((res) => {
        setBooks((prevBooks: any) => {
          return [
            ...new Set([
              ...prevBooks,
              ...res.data.docs.map((b: BookType) => b.title),
            ]),
          ];
        });
        setHasMore(res.data.docs.length > 0);
        setLoading(false);
      })
      .catch((error) => {
        if (axios.isCancel(error)) {
          return;
        }
        setError(true);
      });
  }, [query, pageNumber]);
  return { loading, error, books, hasMore };
};
