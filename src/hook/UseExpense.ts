import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema, TransactionMutationData } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import { FetchAllcategories } from "@/service/Categories";
import { FetchAccounts } from "@/service/accounts";
import { AccountTypes } from "@/app/api/account/route";
import UseExpenses from "./useAddTransaction";
import { useEffect, useState } from "react";

function UseExpense() {
  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: "Expense",
      account: "Cash",
      amount: "",
      currency: "RWF",
      category: "",
      subcategories: [],
      date: new Date().toISOString().split("T")[0],
      time: "11:30",
      payee: "",
      note: "",
    },
  });

  // Fetch data
  const { data, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: FetchAllcategories,
  });

  const { data: accounts } = useQuery({
    queryKey: ["account"],
    queryFn: FetchAccounts,
  });

  const type = watch("type");
  const category = watch("category");

  // Filter categories based on type
  const Expense =
    data?.data.filter((data: { type: string }) => data.type === "1") || [];
  const Income =
    data?.data.filter((data: { type: string }) => data.type === "2") || [];
  const Transfer =
    data?.data.filter((data: { type: string }) => data.type === "3") || [];

  const getCategories = () => {
    switch (type) {
      case "Expense":
        return Expense ?? [];
      case "Income":
        return Income ?? [];
      case "Transfer":
        return Transfer ?? [];
      default:
        return [];
    }
  };

  const [subcategories, setSubcategories] = useState([]);

  useEffect(() => {
    if (category && data?.data) {
      const selectedCategory = data.data.find(
        (item: { id: string }) => item.id === category
      );
      const newSubcategories = selectedCategory?.subcategories || [];
      setSubcategories(newSubcategories);
    } else {
      setSubcategories([]);
    }
  }, [category, data, setValue]);

  const { mutate, isPending } = UseExpenses();

  const onSubmit = (data: TransactionMutationData) => {
    mutate(data);
  };

  return {
    onSubmit,
    getCategories,
    handleSubmit,
    control,
    register,
    errors,
    setValue,
    watch,
    isLoading,
    data,
    accounts: accounts?.usersAccount as AccountTypes,
    isPending,
    subcategories: subcategories ?? [],
    reset,
  };
}

export default UseExpense;
