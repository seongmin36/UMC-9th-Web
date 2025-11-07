import { NavLink } from "react-router-dom";
import type { NavItem } from "../../types/movie";
import AuthButton from "../AuthButton";
import { Hamburger } from "../../components/icons/Hamburger";

const navItems: Record<string, NavItem> = {
  home: { label: "홈", path: "/" },
  popular: { label: "인기 영화", path: "/movies/popular" },
  now_playing: { label: "상영 중", path: "/movies/now_playing" },
  top_rated: { label: "평점 높은", path: "/movies/top_rated" },
  upcoming: { label: "개봉 예정", path: "/movies/upcoming" },
};

interface NavbarProps {
  isOpen: boolean;
  triggerRef: React.RefObject<HTMLButtonElement>;
  onToggle: () => void;
}

const MovieNavbar = ({ isOpen, triggerRef, onToggle }: NavbarProps) => {
  console.log(isOpen);
  return (
    <div className="border-b border-gray-300">
      <ul className="relative flex gap-4 px-8 py-6 font-sm text-xl">
        {/* 햄버거 버튼 클릭 시 사이드바 열림 
        data-hamburger 속성을 활용하여 사이드바 열림 방지 */}
        <button onClick={onToggle} ref={triggerRef}>
          <Hamburger
            color="black"
            width={28}
            height={28}
            className="cursor-pointer"
          />
        </button>
        {/* Record 객체로 매핑해주는 Object.entries() */}
        {Object.entries(navItems).map(([key, cat]) => (
          <li key={key}>
            {/* NavLink의 active 속성을 활용 -> useLocation() 대체 가능 */}
            <NavLink
              to={`${cat.path}`}
              className={({ isActive }) => (isActive ? "text-green-500" : "")}
            >
              {cat.label}
            </NavLink>
          </li>
        ))}
        <div className="flex absolute right-10 top-5 gap-2 justify-center items-center">
          {/* 로그인 인증시 바뀌는 냅바 버튼 */}
          <AuthButton />
        </div>
      </ul>
    </div>
  );
};

export default MovieNavbar;
