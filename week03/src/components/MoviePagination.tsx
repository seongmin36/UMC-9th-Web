const MoviePagination = () => {
  return (
    <div className="flex gap-4 my-10 justify-center items-center text-lg">
      <button className="bg-[#03C75A] rounded-md px-6 py-1 text-white cursor-pointer disabled:cursor-none hover:bg-[#03C75A]/80 transition-colors duration-200">{`<`}</button>
      <p>{1} 페이지</p>
      <button className="bg-[#03C75A] rounded-md px-6 py-1 text-white cursor-pointer disabled:cursor-none hover:bg-[#03C75A]/80 transition-colors duration-200">{`>`}</button>
    </div>
  );
};

export default MoviePagination;
