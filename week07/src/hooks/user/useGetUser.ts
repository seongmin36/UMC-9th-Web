import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "../../constants/key";
import { getUser } from "../../apis/user";
import { useAuth } from "../auth/useAuth";

export const useGetUser = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: [QUERY_KEY.users],
    queryFn: getUser,
    select: (data) => data?.data,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    enabled: !!useAuth().accessToken,
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchInterval: false,
    refetchIntervalInBackground: false,
  });

  return { data, isLoading, error };
};
