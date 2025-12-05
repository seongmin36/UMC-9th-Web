import { useSearchParams } from "react-router-dom";
import { movieSearchSchema } from "../../utils/movieSchema";

export default function useMovieSearchFilter() {
  const [searchParams] = useSearchParams();

  const rawParams = Object.fromEntries(searchParams.entries());

  // zod 파싱
  const zodParsed = movieSearchSchema.safeParse(rawParams);

  if (!zodParsed.success) {
    console.error(zodParsed.error);
    // 기본값 설정
    const defaultValues = movieSearchSchema.parse({});
    return {
      ...defaultValues,
      include_adult: defaultValues.include_adult,
      language: defaultValues.language,
    };
  }

  return zodParsed.data;
}
