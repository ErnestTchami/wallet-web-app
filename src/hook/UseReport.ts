import { transformDataReportWithIcons } from "@/lib/utils/formatReport";
import { FetchReport } from "@/service/Report";
import { useQuery } from "@tanstack/react-query";

function UseReport() {
  const { data, isLoading } = useQuery({
    queryKey: ["report"],
    queryFn: FetchReport,
  });

  const Expenses = transformDataReportWithIcons(data?.Response.Expenses);

  return {
    data: data?.Response,
    isLoading,
    Expenses,
    Income: data?.Response.Income,
  };
}

export default UseReport;
