import { z } from "zod";

export const movieSearchSchema = z.object({
  // 영화 제목
  query: z.string().default(""),

  // 성인 콘텐츠 표시
  include_adult: z
    .string()
    .optional()
    .default("false")
    .transform((val) => val === "true"),

  // 언어
  language: z.string().default("ko-KR"),

  page: z
    .string()
    .regex(/^\d+$/, "페이지는 숫자만 입력해주세요!")
    .optional()
    .default("1"),
  primary_release_year: z.string().optional(),
  year: z.string().optional(),
  region: z.string().optional().default("ko-KR"),
});

export type MovieSearchSchema = z.infer<typeof movieSearchSchema>;
