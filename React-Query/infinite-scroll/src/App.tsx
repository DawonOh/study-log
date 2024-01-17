import React, { Fragment, useCallback, useRef, useState } from "react";
import { useBookSearhQuery } from "./hooks/useBookSearchQuery";
import useDebounce from "./hooks/useDebounce";

function App() {
  const [query, setQuery] = useState("");

  const debouncedSearchText = useDebounce(query, 500);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    error,
  } = useBookSearhQuery(debouncedSearchText);

  const observer = useRef<IntersectionObserver>();

  const lastBookElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (status === "pending") return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });
      if (node) observer.current.observe(node);
    },
    [status, hasNextPage]
  );

  const getSearchQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };
  const bookList = data?.pages;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">
        Infinite scroll with Open Library Search API
      </h1>
      <label className="w-48 mr-4 p-2.5">
        Search :
        <input
          type="search"
          value={query}
          onChange={getSearchQuery}
          className="rounded-xl mx-4 my-4 px-4 py-0.5 focus:outline-none ml-4"
        />
      </label>
      <main className="grid grid-cols-card justify-around items-start w-4/5 h-full p-8 mx-auto my-0 gap-8">
        {bookList?.map((books, i) => (
          <Fragment key={i}>
            {books.docs.map((book) => {
              return (
                <Fragment key={book.key}>
                  <div ref={lastBookElementRef}>{book.title}</div>
                </Fragment>
              );
            })}
          </Fragment>
        ))}
      </main>
      <span className="text-[#2776B4]">
        {(isFetchingNextPage || status === "pending") && "...loading"}
      </span>
      <span className="text-[#2776B4]">
        {(error || status === "error") && "error"}
      </span>
    </div>
  );
}

export default App;
