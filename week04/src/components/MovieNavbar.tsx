import { NavLink } from "react-router-dom";
import type { NavItem } from "../types/movie";

const navItems: Record<string, NavItem> = {
  home: { label: "홈", path: "/" },
  popular: { label: "인기 영화", path: "/movies/popular" },
  now_playing: { label: "상영 중", path: "/movies/now_playing" },
  top_rated: { label: "평점 높은", path: "/movies/top_rated" },
  upcoming: { label: "개봉 예정", path: "/movies/upcoming" },
};

const MovieNavbar = () => {
  return (
    <div className="border-b border-gray-300">
      <ul className="flex gap-4 px-8 py-6 font-sm text-xl">
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
      </ul>
    </div>
  );
};

export default MovieNavbar;
