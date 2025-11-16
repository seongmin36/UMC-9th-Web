import { uploadImage } from "../apis/img";
import { CheckIcon } from "../components/icons/CheckIcon";
import { SettingIcon } from "../components/icons/Setting";
import { useGetUser } from "../hooks/user/useGetUser";
import { useEffect, useRef, useState } from "react";
import { usePatchUser } from "../hooks/user/usePatchUser";
import toast from "react-hot-toast";

const MyPage = () => {
  const { data: user } = useGetUser();
  const [userName, setUserName] = useState<string>("");
  const [userBio, setUserBio] = useState<string>("");
  const [userAvatar, setUserAvatar] = useState<string>("");
  const [isSetting, setIsSetting] = useState(false);
  const { mutateAsync: patchUser } = usePatchUser();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 설정 버튼 클릭 시 설정 모드 토글
  const handleSetting = () => {
    setIsSetting((prev) => !prev);
  };

  // 아바타 변경 시 이미지 미리보기
  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fileUrl = URL.createObjectURL(file);
    // 미리보기용
    setUserAvatar(fileUrl);

    // 서버 전송용
    const uploadUrl = await uploadImage(file);
    setUserAvatar(uploadUrl);
  };

  // 이미지 미리보기 해제 -> 메모리 누수 방지
  useEffect(() => {
    console.log(userAvatar);
    return () => {
      if (userAvatar && userAvatar !== user?.avatar) {
        URL.revokeObjectURL(userAvatar);
      }
    };
  }, [userAvatar, user?.avatar]);

  // 유저 정보 자동 설정
  useEffect(() => {
    if (user) {
      setUserName(user.name);
      setUserBio(user.bio ?? "");
      setUserAvatar(user.avatar ?? "");
    }
  }, [user]);

  // 유저 정보 수정
  const handleUserInputChange = async () => {
    if (confirm("정보를 수정하시겠습니까?")) {
      await patchUser(
        {
          name: userName,
          bio: userBio,
          avatar: userAvatar,
        },
        {
          onSuccess: () => {
            setIsSetting(false);
          },
          onError: (error) => {
            toast.error(error.message, {
              duration: 2000,
              id: "mypage-update-error",
            });
          },
        }
      );
    } else {
      toast.error("정보 수정이 취소되었습니다!", {
        duration: 2000,
        id: "mypage-update",
      });
    }
  };
  return (
    <div className="flex flex-col items-center justify-start bg-neutral-900 p-4 min-h-screen">
      <div className="relative max-w-80 w-full flex flex-col items-center justify-center bg-neutral-800 rounded-lg py-10">
        <button
          onClick={handleSetting}
          className="absolute top-4 right-4 z-50 w-8 h-8 rounded-full flex items-center justify-center gap-2 cursor-pointer hover:text-neutral-500 transition-colors"
        >
          <SettingIcon color="white" width={24} height={24} />
        </button>
        {isSetting ? (
          <>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarChange}
            />
            <div
              onClick={() => fileInputRef.current?.click()}
              className="w-24 h-24 mb-4 cursor-pointer"
            >
              <img
                className="w-full h-full rounded-full object-cover"
                src={userAvatar || "/src/assets/user.svg"}
                alt="avatar"
              />
            </div>
            <div className="flex flex-col items-start justify-center text-neutral-400 gap-2">
              <div className="flex items-center justify-center gap-2">
                <input
                  type="text"
                  className="w-full p-2 rounded-md border border-neutral-600 text-neutral-100 bg-neutral-800"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
                <button onClick={() => handleUserInputChange()}>
                  <CheckIcon color="white" width={24} height={24} />
                </button>
              </div>
              <input
                type="text"
                value={userBio}
                className="w-full p-2 rounded-md border border-neutral-600 text-neutral-100 bg-neutral-800"
                onChange={(e) => setUserBio(e.target.value)}
              />
              <p className="text-sm">{user?.email}</p>
            </div>
          </>
        ) : (
          <>
            <img
              className="w-24 h-24 rounded-full mb-4 object-cover"
              src={user?.avatar || "/src/assets/user.svg"}
              alt="avatar"
            />
            <div className="flex flex-col items-start justify-center gap-2">
              <p className="text-2xl font-semibold text-white">{user?.name}</p>
              <p className="text-lg font-medium text-neutral-200">
                {user?.bio}
              </p>
              <p className="text-sm text-neutral-400">{user?.email}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MyPage;
