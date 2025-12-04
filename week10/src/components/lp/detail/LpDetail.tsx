import { useEffect, useState, useCallback, useMemo } from "react";
import useGetLpDetail from "../../../hooks/lps/query/useGetLpDetail";
import { useGetUser } from "../../../hooks/user/useGetUser";
import { Order } from "../../../types/common/enum";
import LpReview from "../review/LpReview";
import {
  useDeleteLp,
  usePatchLp,
} from "../../../hooks/lps/mutation/usePatchLp";
import toast from "react-hot-toast";
import EditSection from "./EditSection";
import ViewSection from "./ViewSection";
import Header from "./Header";
import LpLike from "./LpLIke";
interface LpDetailProps {
  lpId: number;
}

const LpDetail = ({ lpId }: LpDetailProps) => {
  const { data: lp } = useGetLpDetail(lpId);
  const { data: user } = useGetUser();
  const { mutate: patchLp } = usePatchLp(lpId);
  const { mutate: deleteLp } = useDeleteLp(lpId);

  const [isSetting, setIsSetting] = useState(false);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [thumbnail, setThumbnail] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState<string>("");
  const [published, setPublished] = useState<boolean>(false);

  // 설정 버튼 클릭 시 설정 모드 토글
  const handleSetting = useCallback(() => {
    setIsSetting((prev) => !prev);
  }, []);

  // 유저 정보 자동 설정
  useEffect(() => {
    if (lp) {
      setTitle(lp.title);
      setContent(lp.content);
      setThumbnail(lp.thumbnail);
      setTags(lp.tags?.map((tag) => tag.name) ?? []);
      setPublished(lp.published);
    }
  }, [lp]);

  // LP 수정
  const handlePatchLp = useCallback(async () => {
    if (confirm("정보를 수정하시겠습니까?")) {
      await patchLp(
        {
          title: title,
          content: content,
          thumbnail: thumbnail,
          tags: tags,
          published: published,
        },
        {
          onSuccess: () => {
            toast.success("수정이 완료되었습니다.", {
              id: "update-lp-success",
              duration: 2000,
            });
            setIsSetting(false);
          },
          onError: (error) => {
            toast.error(error.message, {
              id: "update-lp-error",
              duration: 2000,
            });
          },
        }
      );
    } else {
      toast.error("수정이 취소되었습니다.", {
        id: "update-lp-error",
        duration: 2000,
      });
    }
  }, [patchLp, title, content, thumbnail, tags, published]);

  // LP 삭제
  const handleDeleteLp = useCallback(() => {
    if (confirm("정말 삭제하시겠습니까?")) {
      deleteLp();
    } else {
      toast.error("삭제가 취소되었습니다.", {
        id: "delete-lp-error",
        duration: 2000,
      });
    }
  }, [deleteLp]);

  // 태그 추가 시 태그 문자열 동기화
  useEffect(() => {
    if (lp) {
      const names = lp.tags?.map((tag) => tag.name) ?? [];
      setTags(names);
      // 초기 진입 시에만 문자열을 만들어줌
      setTagInput(names.length ? "#" + names.join(" #") : "");
    }
  }, [lp]);

  const isLiked = useMemo(
    () => lp?.likes?.some((like) => like.userId === user?.id),
    [lp?.likes, user?.id]
  );
  const likeCount = useMemo(() => lp?.likes?.length ?? 0, [lp?.likes]);

  return (
    <div className="min-h-screen text-white bg-black p-8">
      <div className="max-w-3xl mx-auto px-6 pt-10 pb-16 rounded-md bg-[#282A31]">
        {/* 헤더 */}
        <Header
          lp={lp!}
          user={user!}
          isSetting={isSetting}
          handleSetting={handleSetting}
          handlePatchLp={handlePatchLp}
          handleDeleteLp={handleDeleteLp}
          handleCancel={() => setIsSetting(false)}
        />

        {/* 수정 섹션 */}
        {isSetting ? (
          <EditSection
            title={title}
            setTitle={setTitle}
            thumbnail={thumbnail}
            setThumbnail={setThumbnail}
            content={content}
            setContent={setContent}
            tags={tags}
            setTags={setTags}
            tagInput={tagInput}
            setTagInput={setTagInput}
          />
        ) : (
          <ViewSection lp={lp!} />
        )}

        {/* 좋아요 */}
        <div className="flex items-center justify-center ml-10 mb-10">
          <LpLike isLiked={isLiked!} likeCount={likeCount} lpId={lpId} />
        </div>

        {/* 리뷰 */}
        <LpReview lpId={lpId} initialOrder={Order.desc} />
      </div>
    </div>
  );
};

export default LpDetail;
