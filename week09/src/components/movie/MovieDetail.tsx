import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import type {
  ResponseMovieCredits,
  ResponseMovieDetail,
} from "../../types/movie";
import { getMovieCredits, getMovieDetails } from "../../apis/movies";
import toast from "react-hot-toast";
import Pending from "../common/Pending";

const MovieDetail = () => {
  const { movieId } = useParams();
  const numMovieId = Number(movieId);
  const [movie, setMovie] = useState<ResponseMovieDetail | null>(null);
  const [credit, setCredit] = useState<ResponseMovieCredits | null>(null);
  const [isMore, setIsMore] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const tmdbBaseUrl = import.meta.env.VITE_TMDB_IMAGE_BASE_URL; // 예: https://image.tmdb.org/t/p/original

  useEffect(() => {
    if (!numMovieId) return;
    const fetchMovieDetails = async () => {
      try {
        setIsLoading(true);
        const { data: detailData } = await getMovieDetails(numMovieId);
        const { data: creditData } = await getMovieCredits(numMovieId);
        setMovie(detailData);
        setCredit(creditData);
      } catch (e) {
        console.error(e);
        // 에러 메시지 시간 지나면 사라지기
        toast.error(`데이터를 불러오는데 실패했습니다!\n${e}`, {
          duration: 2_000,
          id: "movie-detail-fetch",
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchMovieDetails();
  }, [numMovieId]);

  const overview = movie?.overview ?? "";
  const handleClamp = useMemo(() => overview.trim().length < 150, [overview]);

  const handleIsMoreBtn = () => {
    if (handleClamp) return;
    setIsMore((prev) => !prev);
  };

  return (
    <div className="bg-[#1B1B1B] text-white">
      {isLoading ? (
        <Pending />
      ) : (
        <>
          <section className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden">
            {/* 배경 포스터 */}
            {movie?.backdrop_path && (
              <img
                src={`${tmdbBaseUrl}${movie.backdrop_path}`}
                alt={movie.title ?? "backdrop"}
                className="absolute inset-0 object-cover w-full h-full"
              />
            )}
            <div className="absolute inset-0 bg-black/50" />
          </section>
          {/* 추가 레이어 영역 */}
          <div className="relative pb-16 md:-mt-40">
            <div
              className="
            mx-auto w-[min(1100px,92%)] 
            rounded-2xl bg-[#1B1B1B]/95 
            p-6 md:p-8 
            ring-1 ring-white/10 shadow-xl
          "
            >
              <div className="flex mb-20">
                <img
                  src={`${tmdbBaseUrl}${movie?.poster_path}`}
                  alt=""
                  className="mr-6 max-w-80 max-h-100"
                />
                <div className="flex flex-col gap-3">
                  <h1 className="text-2xl font-bold md:text-3xl">
                    {movie?.title}
                  </h1>
                  {movie?.tagline && (
                    <p className="italic text-gray-300">{movie.tagline}</p>
                  )}
                  <div className="grid grid-cols-2 gap-2 text-sm text-gray-300 sm:grid-cols-2">
                    <span>개봉일: {movie?.release_date ?? "-"}</span>
                    <span>런타임: {movie?.runtime ?? "-"}분</span>
                    <span className="col-span-1 mb-4 sm:col-span-2">
                      평점: {movie?.vote_average ?? "-"}{" "}
                      {`(${movie?.vote_count})`}
                    </span>
                  </div>
                  <span className="flex flex-wrap items-center gap-2 text-sm">
                    제작
                    {movie?.production_companies.map((i) => (
                      <p
                        className="px-3 py-1 border rounded-full border-white/15"
                        key={i.id}
                      >
                        {i.name}
                      </p>
                    ))}
                  </span>
                  {/* 장르 */}
                  {movie?.genres?.length ? (
                    <ul className="flex items-center gap-2 text-sm text-gray-100">
                      장르
                      {movie.genres.map((item) => (
                        <li
                          key={item.id}
                          className="px-3 py-1 border rounded-full border-white/15"
                        >
                          {item.name}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                  {/* 영화 상세설명 */}
                  {movie?.overview ? (
                    <div>
                      <p
                        className={`leading-7 text-gray-200 ${
                          isMore && "line-clamp-3"
                        }`}
                      >
                        {movie.overview}
                      </p>
                      {!handleClamp && (
                        <button
                          onClick={handleIsMoreBtn}
                          className="text-[#FFFFFF]/40 cursor-pointer"
                        >
                          {isMore ? "더보기" : "간략히"}
                        </button>
                      )}
                    </div>
                  ) : (
                    <>
                      <span className="text-gray-500">
                        상세정보가 없습니다.
                      </span>
                    </>
                  )}
                </div>
              </div>
              {/* credit 정보 */}
              <span className="text-4xl font-medium">감독/출연</span>
              <div className="grid grid-cols-8 gap-4 mt-5">
                {/* 감독 */}
                {credit?.crew
                  .filter((crew) => crew.job === "Director")
                  .map((director) => (
                    <div
                      key={director.id}
                      className="text-center text-gray-300 w-25"
                    >
                      {director.profile_path ? (
                        <img
                          src={`${tmdbBaseUrl}${director.profile_path}`}
                          alt=""
                          className="w-full border rounded-md border-white/80"
                        />
                      ) : (
                        <div className="flex items-center justify-center text-xs bg-gray-400 border rounded-md w-25 h-37 border-white/80">
                          이미지가 없습니다
                        </div>
                      )}
                      <p className="text-white" key={director.credit_id}>
                        {director.name}
                      </p>
                      <p className="text-[10px]">{director.job}</p>
                    </div>
                  ))}
                {/* 출연진 */}
                {credit?.cast.slice(0, 15).map((cast) => (
                  <div key={cast.id} className="text-center text-gray-300 w-25">
                    <img
                      src={`${tmdbBaseUrl}${cast.profile_path}`}
                      alt=""
                      className="w-full border rounded-md border-white/80"
                    />
                    <p className="text-white" key={cast.id}>
                      {cast.name}
                    </p>
                    <p className="text-[10px]">{cast.character}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MovieDetail;
