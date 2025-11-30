import { NavLink } from "react-router-dom";
import type { NavItem } from "../../types/movie";
import AuthButton from "../AuthButton";
import { Hamburger } from "../../components/icons/Hamburger";
import { CiShoppingCart } from "react-icons/ci";

import { useEffect } from "react";
import { useCartActions, useCartInfo } from "../../store/useCartStore";

const navItems: Record<string, NavItem> = {
  home: { label: "홈", path: "/" },
  popular: { label: "인기 영화", path: "/movies/popular" },
  now_playing: { label: "상영 중", path: "/movies/now_playing" },
  top_rated: { label: "평점 높은", path: "/movies/top_rated" },
  upcoming: { label: "개봉 예정", path: "/movies/upcoming" },
};

interface NavbarProps {
  triggerRef: React.RefObject<HTMLButtonElement>;
  onToggle: () => void;
}

const MovieNavbar = ({ triggerRef, onToggle }: NavbarProps) => {
  const { items, amount: cartAmount } = useCartInfo();
  const { calculateTotals } = useCartActions();

  // 카트 정보 계산
  useEffect(() => {
    calculateTotals();
  }, [calculateTotals, items]);

  return (
    <div className="sticky top-0 z-20 bg-white border-b border-gray-300">
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
          {/* 장바구니 페이지로 이동 */}
          <NavLink to="/cart" className="cursor-pointer">
            <CiShoppingCart className="text-2xl text-blue-500 w-8 h-8" />
          </NavLink>
          <span className="text-sm text-gray-500">{cartAmount}</span>
          {/* 로그인 인증시 바뀌는 냅바 버튼 */}
          <AuthButton />
        </div>
      </ul>
    </div>
  );
};

export default MovieNavbar;
