import type { AppDispatch, RootState } from "./../../../store/cartStore";
import { useDispatch, useSelector } from "react-redux";

// 디스패치 타입 추론을 위해 사용
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

// 스토어 상태 추론을 위해 사용
export const useAppSelector = useSelector.withTypes<RootState>();
