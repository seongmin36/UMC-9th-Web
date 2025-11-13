import type { CommonResponse } from "../common/common";

// LP
export type Lp = {
  id: number;
  title: string;
  content: string;
  thumbnail: string;
  published: boolean;
  authorId: number;
  createdAt: string;
  updatedAt: string;
  tags?: Tag[];
  likes?: Like[];
  author?: Author;
};

// 좋아요
export type Like = {
  id: number;
  userId: number;
  lpId: number;
};

// 태그
export type Tag = {
  id: number;
  name: string;
};

// 작성자
export type Author = {
  id: number;
  name: string;
  email: string;
  bio: string | null;
  avatar: string | null;
  createdAt: string;
  updatedAt: string;
};

// LP 리스트 데이터 타입
export type LpData = {
  data: Lp[];
  nextCursor: number | null;
  hasNext: boolean;
};

// LP 리스트 응답 타입
export type ResponseLpListDto = CommonResponse<LpData>;

// LP 상세 응답 타입
export type ResponseLpDetailDto = CommonResponse<Lp>;

// LP 생성 요청 타입
export type RequestCreateLpDto = {
  title: string;
  content: string;
  thumbnail: string;
  tags: string[];
  published: boolean;
};

// LP 생성 응답 타입
export type ResponseCreateLpDto = CommonResponse<Lp>;
