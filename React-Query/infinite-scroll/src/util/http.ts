import { QueryClient } from "@tanstack/react-query";
import axios from "axios";
import { BookResponseType } from "../type/bookType";

export const queryClient = new QueryClient();

export const getBookData = async ({
  query,
  pageParam = 1,
}: {
  query: string;
  pageParam: number;
}) => {
  const response = await axios.get<BookResponseType>(
    `https://openlibrary.org/search.json?q=${query}&page=${pageParam}`
  );
  return response.data;
};
