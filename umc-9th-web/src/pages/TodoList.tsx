const TodoList = () => {
  return (
    <body className="bg-amber-50 flex justify-center items-center">
      <section className="border w-120 text-center p-4 bg-white border-none rounded-xl shadow-md">
        <h1 className="font-bold text-2xl my-4">KRONG TODO</h1>
        <div className="flex justify-center items-center gap-2 mb-4 w-full">
          <input
            type="text"
            placeholder="할 일 입력"
            className="border border-gray-300 rounded-md min-w-80 px-2 py-1"
          />
          <button className="text-white px-2 py-1 bg-[#17b75e] border rounded-lg cursor-pointer">
            할 일 추가
          </button>
        </div>
        <section>
          <div className="flex justify-evenly gap-10 font-black pb-4">
            <p>할 일</p>
            <p>완료</p>
          </div>
          <div className="flex justify-evenly font-semibold">
            <div className="flex border-none shadow-sm gap-20 justify-between px-2 py-1 items-center bg-gray-100 rounded-md">
              <p className="text-start">크롱</p>
              <button className="text-white font-normal px-2 py-1 bg-[#17b75e] border rounded-lg cursor-pointer">
                완료
              </button>
            </div>
            <div className="flex border-none shadow-sm gap-20 justify-between px-2 py-1 items-center bg-gray-100 rounded-md">
              <p>성민</p>
              <button className="text-white font-normal px-2 py-1 border rounded-lg bg-[#c4302b] cursor-pointer">
                삭제
              </button>
            </div>
          </div>
        </section>
      </section>
    </body>
  );
};

export default TodoList;
