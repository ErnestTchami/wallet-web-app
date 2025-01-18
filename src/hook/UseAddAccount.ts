import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import showToast from "@/lib/utils/showToast";
import { AddNewAccount } from "@/service/accounts";
import UseAccounts from "./UseAcoount";
import { AddNewAccountTypes } from "@/types/types";

const accountSchema = z.object({
  name: z.string().nonempty("Name is required"),
  initialAmount: z
    .string()
    .refine(
      (val) => /^0$|^[1-9]\d*$/.test(val),
      "Initial amount must be a valid number."
    ),
  currency: z.enum(["RWF"]),
  excludeFromStats: z.boolean(),
});

function UseAddAccount() {
  const { refetch } = UseAccounts();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      name: "",
      accountType: "General",
      initialAmount: "0",
      currency: "RWF",
      excludeFromStats: false,
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: AddNewAccount,
    onSuccess: () => {
      refetch();
      showToast("Transaction added successful", "success");
    },
    onError: (error) => {
      showToast(`Error occurred ${error}`, "error");
    },
  });
  const onSubmit = (data: AddNewAccountTypes) => {
    mutate(data);
  };
  return {
    onSubmit,
    errors,
    control,
    handleSubmit,
    isPending,
  };
}

export default UseAddAccount;
