import type { CommonResponse } from "./common/common";

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
  tags: {
    id: number;
    name: string;
  };
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

// LP 리스트 데이터 타입
export type LpData = {
  data: Lp[];
  nextCursor: number | null;
  hasNext: boolean;
};

// LP 리스트 응답 타입
export type ResponseLpListDto = CommonResponse<LpData>;
