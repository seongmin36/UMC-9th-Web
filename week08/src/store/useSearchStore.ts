import { create } from "zustand";

interface SearchState {
  isSearchOpen: boolean;
  // 검색어 상태
  search: string | null;
  // 검색어 쿼리 상태
  searchQuery: string | null;
  // 검색어 설정
  setSearch: (search: string | null) => void;
  // 검색어 쿼리 설정
  setSearchQuery: (searchQuery: string | null) => void;
  openSearch: () => void;
  closeSearch: () => void;
}

export const useSearchStore = create<SearchState>((set) => ({
  isSearchOpen: false,
  search: null,
  searchQuery: null,
  setSearch: (search) => set({ search }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  openSearch: () => set({ isSearchOpen: true }),
  closeSearch: () =>
    set({ isSearchOpen: false, search: null, searchQuery: null }),
}));
