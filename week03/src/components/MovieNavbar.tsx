import { useNavigate } from 'react-router-dom';
import type { NavItem } from '../types/movie';

const navItems: Record<string, NavItem> = {
  home: { label: '홈', path: '/' },
  popular: { label: '인기 영화', path: '/movies/popular' },
  now_playing: { label: '상영 중', path: '/movies/now_playing' },
  top_rated: { label: '평점 높은', path: '/movies/top_rated' },
  upcoming: { label: '개봉 예정', path: '/movies/upcoming' },
};

const MovieNavbar = () => {
  const navigate = useNavigate();

  return (
    <div className="border-b border-gray-300">
      <ul className="flex gap-3 px-3 py-3 font-medium ">
        {Object.entries(navItems).map(([key, cat]) => (
          <li key={key}>
            <button
              onClick={() => navigate(`movies${cat.path}`)}
              className="cursor-pointer"
            >
              {cat.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieNavbar;
