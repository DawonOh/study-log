import { QueryClient } from "@tanstack/react-query";
import axios from "axios";
import { BookResponseType } from "../type/bookType";

export const queryClient = new QueryClient();

export const getBookData = async ({ pageParam = 1 }) => {
  const response = await axios.get<BookResponseType>(
    `https://openlibrary.org/search.json?q=the+lord+of+the+rings&page=${pageParam}`
  );
  return response.data;
};
