import { useQuery } from "@tanstack/react-query";
import { FetchAccounts } from "@/service/accounts";
import { AccountTypes } from "@/app/api/account/route";
import { useState } from "react";

function UseAccounts() {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["account"],
    queryFn: FetchAccounts,
  });

  const [searchTerm, setSearchTerm] = useState("");

  const filteredAccounts = data?.usersAccount
    ? data?.usersAccount?.filter((account: { name: string }) =>
        (account.name as string)
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      )
    : [];

  return {
    isLoading,
    data,
    accounts: data?.usersAccount as AccountTypes,
    refetch,
    setSearchTerm,
    filteredAccounts,
    searchTerm,
  };
}

export default UseAccounts;
