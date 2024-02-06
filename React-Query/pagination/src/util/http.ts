import { QueryClient } from "@tanstack/react-query";
import axios from "axios";
import { BookResponseType } from "../type/bookType";

export const queryClient = new QueryClient();

export const getBookList = async ({ currPage }: { currPage: number }) => {
  try {
    const response = await axios.get<BookResponseType>(
      `https://openlibrary.org/search.json?q=the+lord+of+the+rings&page=${currPage}&limit=10`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
