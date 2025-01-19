import { useQuery } from "@tanstack/react-query";
import { AccountTypes } from "@/app/api/account/route";
import { FetchStatistics } from "@/service/statistics";

function UseStatistics(Date: string | Date) {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["statistics", Date],
    queryFn: () => FetchStatistics(Date),
  });
  return {
    isLoading,
    data,
    accounts: data?.usersAccount as AccountTypes,
    refetch,
  };
}

export default UseStatistics;
