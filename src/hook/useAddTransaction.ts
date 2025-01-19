import { useMutation } from "@tanstack/react-query";
import { AddNewTransaction } from "@/service/transaction";
import showToast from "@/lib/utils/showToast";
import UseStatistics from "./useStatistics";

function UseExpenses() {
  const { refetch } = UseStatistics(new Date());
  const { mutate, isPending } = useMutation({
    mutationFn: AddNewTransaction,
    onSuccess: () => {
      refetch();
      showToast("Transaction added successful", "success");
    },
    onError: (error) => {
      showToast(`Error occurred ${error}`, "error");
    },
  });
  return {
    isPending,
    mutate,
  };
}

export default UseExpenses;
