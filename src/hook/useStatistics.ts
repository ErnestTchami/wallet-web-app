import { useQuery } from "@tanstack/react-query";
import { AccountTypes } from "@/app/api/account/route";
import { FetchStatistics } from "@/service/statistics";

function UseStatistics() {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["statistics"],
    queryFn: FetchStatistics,
  });
  return {
    isLoading,
    data,
    accounts: data?.usersAccount as AccountTypes,
    refetch,
  };
}

export default UseStatistics;
