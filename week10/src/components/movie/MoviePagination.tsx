import { memo, useCallback } from "react";

interface MoviePaginationProps {
  page: number;
  total_pages: number;
  onPageChange: (page: number) => void;
}

const MoviePagination = ({
  total_pages,
  page,
  onPageChange,
}: MoviePaginationProps) => {
  const handlePageLeft = useCallback(() => {
    if (page > 1) onPageChange(page - 1);
  }, [page, onPageChange]);

  const handlePageRight = useCallback(() => {
    onPageChange(page + 1);
  }, [page, onPageChange]);

  return (
    <div className="flex gap-4 my-10 justify-center items-center text-lg">
      <button
        disabled={page === 1}
        onClick={handlePageLeft}
        className="bg-[#03C75A] rounded-md px-6 py-1 text-white cursor-pointer disabled:cursor-not-allowed hover:bg-[#03C75A]/80 transition-colors duration-200 disabled:bg-gray-300"
      >{`<`}</button>
      <p>{page} 페이지</p>
      <button
        disabled={total_pages === page}
        onClick={handlePageRight}
        className="bg-[#03C75A] rounded-md px-6 py-1 text-white cursor-pointer disabled:cursor-not-allowed hover:bg-[#03C75A]/80 transition-colors duration-200 disabled:bg-gray-300"
      >{`>`}</button>
    </div>
  );
};

export default memo(MoviePagination);
