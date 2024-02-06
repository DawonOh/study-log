import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getBookList } from "./util/http";
import { BookType } from "./type/bookType";

function App() {
  const [currPage, setCurrPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const [pageGroup, setPageGroup] = useState(1);

  const { data, isLoading } = useQuery({
    queryKey: ["list", { page: currPage }],
    queryFn: () => getBookList({ currPage }),
    staleTime: 1000 * 60,
  });

  useEffect(() => {
    data?.numFound && setMaxPage(Math.ceil(data?.numFound / 10));
    setPageGroup(Math.ceil(currPage / 10));
  }, [currPage, data?.numFound]);

  let endPage = pageGroup * 10;
  if (endPage >= maxPage) {
    endPage = maxPage;
  }
  let startPage = endPage - 9;
  if (startPage < 1) {
    startPage = 1;
  }

  const pageNumbers = () => {
    let arr = [];
    for (let i = startPage; i <= endPage; i++) {
      arr.push(
        <span
          className={`flex justify-center items-center cursor-pointer hover:text-[#F6B17A] w-4 h-4 p-4 ${
            currPage === i && "bg-[#7077A1] text-[#F6B17A] rounded-full"
          }`}
          key={i}
          onClick={() => {
            setCurrPage(i);
          }}
        >
          {i}
        </span>
      );
    }
    return arr;
  };
  return (
    <>
      <header className="flex w-full top-0 gap-4 sticky text-[#F6B17A] p-4">
        <h1 className="text-2xl font-bold">Pagination with Tanstack Query</h1>
        {isLoading && (
          <div className="flex gap-2 mt-4 relative">
            <div className="w-2 h-2 rounded-full bg-[#E1DCC5] animate-[scale_500ms_ease-in-out_alternate_infinite]" />
            <div className="w-2 h-2 rounded-full bg-[#F6B17A] animate-[scale_500ms_ease-in-out_250ms_alternate_infinite]" />
            <div className="w-2 h-2 rounded-full bg-[#E1DCC5] animate-[scale_500ms_ease-in-out_500ms_alternate_infinite]" />
          </div>
        )}
      </header>
      <div className="w-4/5 h-screen mx-auto my-0 p-4">
        <div className="flex gap-2 mb-4 text-[#7077A1]">
          <button
            className="cursor-pointer hover:text-[#F6B17A]"
            onClick={() => setCurrPage((page) => page - 1)}
            disabled={currPage === 1}
          >
            prev
          </button>
          {pageNumbers()}
          <button
            className="cursor-pointer hover:text-[#F6B17A]"
            onClick={() => setCurrPage((page) => page + 1)}
            disabled={currPage === maxPage}
          >
            next
          </button>
        </div>
        <div className="flex flex-col gap-4">
          {data?.docs.map((book: BookType) => {
            return (
              <div
                key={book.key}
                className="flex flex-col w-full p-4 bg-[#424769] text-[#2d3250] rounded-xl"
              >
                <span className="text-xl font-bold text-[#7077A1]">
                  {book.title}
                </span>
                <span>author: {book.author_name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
