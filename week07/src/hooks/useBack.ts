import { useLocation, useNavigate } from "react-router-dom";

export function useBack(defaultPage: string) {
  const location = useLocation();
  const navigate = useNavigate();

  const goBack = () => {
    const prev = location.state?.from || defaultPage;
    navigate(prev);
  };

  return goBack;
}
