import { Fragment, useCallback, useRef } from "react";
import { useBookSearhQuery } from "./hooks/useBookSearchQuery";

function App() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    error,
  } = useBookSearhQuery();

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
    [status]
  );

  const bookList = data?.pages;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">
        Infinite scroll with Open Library Search API
      </h1>
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
