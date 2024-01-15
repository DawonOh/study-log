import React, { useState, useRef, useCallback, Fragment } from "react";
import { useBookSearch } from "./hooks/useBookSearch";
import useDebounce from "./hooks/useDebounce";

function App() {
  const [query, setQuery] = useState("");
  const [pageNumber, setPageNumber] = useState(1);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setPageNumber(1);
  };

  const debouncedSearchText = useDebounce(query, 500);

  const { books, hasMore, loading, error } = useBookSearch(
    debouncedSearchText,
    pageNumber
  );

  const observer = useRef<IntersectionObserver>();

  const lastBookElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (loading) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        // console.log("entries[0].isIntersecting : ", entries[0].isIntersecting);
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

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
          onChange={handleSearch}
          className="rounded-xl mx-4 my-4 px-4 py-0.5 focus:outline-none ml-4"
        />
      </label>
      <span className="text-[#2776B4]">{loading && "...loading"}</span>
      <span className="text-[#FF3B30]">{error && "Error"}</span>
      <main className="grid grid-cols-card justify-around items-start w-4/5 h-full p-8 mx-auto my-0 gap-8">
        {books.map((book, index) => {
          if (books.length === index + 1) {
            return (
              <div ref={lastBookElementRef} key={book}>
                {book}
              </div>
            );
          } else {
            return (
              <div
                key={book}
                className="h-auto p-4 rounded-md bg-white shadow-md shadow-[#f5f5f5]"
              >
                <div className="text-center border-b">{index + 1}</div>
                <div className="text-center font-bold">{book}</div>
              </div>
            );
          }
        })}
      </main>
    </div>
  );
}

export default App;
