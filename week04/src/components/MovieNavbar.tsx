import { NavLink, useNavigate } from "react-router-dom";
import type { NavItem } from "../types/movie";

const navItems: Record<string, NavItem> = {
  home: { label: "홈", path: "/" },
  popular: { label: "인기 영화", path: "/movies/popular" },
  now_playing: { label: "상영 중", path: "/movies/now_playing" },
  top_rated: { label: "평점 높은", path: "/movies/top_rated" },
  upcoming: { label: "개봉 예정", path: "/movies/upcoming" },
};

const MovieNavbar = () => {
  const navigate = useNavigate();
  return (
    <div className="border-b border-gray-300">
      <ul className="relative flex gap-4 px-8 py-6 font-sm text-xl">
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
        <div className="flex absolute right-10 gap-2 justify-center items-center">
          <button
            onClick={() =>
              navigate(`/signup`, { state: { from: location.pathname } })
            }
            className="bg-[#1298c5] rounded-md text-sm text-white text-center w-20 py-2.5"
          >
            로그인
          </button>
          <button
            onClick={() =>
              navigate(`/signup`, { state: { from: location.pathname } })
            }
            className="border-2 rounded-md text-sm text-[#1298c5] text-center w-20 py-2"
          >
            회원가입
          </button>
        </div>
      </ul>
    </div>
  );
};

export default MovieNavbar;
