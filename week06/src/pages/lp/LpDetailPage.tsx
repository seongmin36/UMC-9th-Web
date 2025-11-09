import { useMemo } from "react";
import { useParams } from "react-router-dom";
import Error from "../../components/common/Error";
import LpDetail from "../../components/lp/LpDetail";

const LpDetailPage = () => {
  const { lpId } = useParams<{ lpId: string }>();

  const parsedLpId = useMemo(() => {
    if (!lpId) return null;
    const parsed = Number(lpId);
    return Number.isNaN(parsed) ? null : parsed;
  }, [lpId]);

  if (!parsedLpId) {
    return <Error error="유효하지 않은 LP ID 입니다." />;
  }

  return <LpDetail lpId={parsedLpId} />;
};

export default LpDetailPage;
