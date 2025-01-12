"use client";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const amountSchema = z.string().refine(
  (val) => {
    return /^0$|^[1-9]\d*$/.test(val);
  },
  {
    message:
      "Amount must be a number and cannot start with zero (except for '0').",
  }
);
const formSchema = z.object({
  type: z.enum(["Expense", "Income", "Transfer"]),
  account: z.string().nonempty("Account is required"),
  amount: amountSchema,
  currency: z.string(),
  category: z.string().nonempty("Category is required"),
  labels: z.string().optional(),
  date: z.string().nonempty("Date is required"),
  time: z.string().nonempty("Time is required"),
  payee: z.string().optional(),
  note: z.string().optional(),
});

const ExpenseForm = () => {
  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
    watch,
    setValue,
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: "Expense",
      account: "Cash",
      amount: "",
      currency: "RWF",
      category: "",
      labels: "",
      date: new Date().toISOString().split("T")[0],
      time: "11:30",
      payee: "",
      note: "",
    },
  });

  const type = watch("type");

  const getCategories = () => {
    switch (type) {
      case "Expense":
        return ["Food", "Transport", "Utilities", "Shopping", "Entertainment"];
      case "Income":
        return ["Salary", "Freelance", "Investment", "Gift"];
      case "Transfer":
        return ["Internal Transfer", "External Transfer"];
      default:
        return [];
    }
  };

  const onSubmit = (data: unknown) => {
    console.log("Form submitted:=======", data);
    // Perform API calls or other actions here
  };

  return (
    <Card className="w-full max-w-2xl mx-auto rounded-none bg-neutral-800 border-none">
      <CardHeader>
        <CardTitle>Add Record</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex gap-0">
            {["Expense", "Income", "Transfer"].map((typeOption) => (
              <button
                key={typeOption}
                type="button"
                onClick={() => setValue("type", typeOption)}
                className={`px-3 py-1 ${
                  watch("type") === typeOption ? "bg-cyan-800" : "bg-gray-600"
                } text-white`}
              >
                {typeOption}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2 bg-inherit">
              <label className="text-sm font-medium">Account</label>
              <select
                {...register("account")}
                className="w-full p-2 border rounded bg-neutral-800"
              >
                <option value="Cash" className="bg-inherit">
                  Cash
                </option>
                <option value="Bank">Bank</option>
                <option value="Credit">Credit Card</option>
              </select>
              {errors.account && (
                <span className="text-sm text-red-500">
                  {errors.account.message}
                </span>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Amount</label>
              <div className="flex gap-2">
                <Controller
                  name="amount"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="text"
                      className={errors.amount ? "border-red-500" : ""}
                    />
                  )}
                />
                <select
                  {...register("currency")}
                  className="w-24 p-2 border rounded bg-neutral-800 "
                >
                  <option value="RWF">RWF</option>
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                </select>
              </div>
              {errors.amount && (
                <span className="text-sm text-red-500">
                  {errors.amount.message}
                </span>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Category</label>
              <select
                {...register("category")}
                className="w-full p-2 border rounded bg-neutral-800"
              >
                <option value="">Choose</option>
                {getCategories().map((cat) => (
                  <option key={cat} value={cat.toLowerCase()}>
                    {cat}
                  </option>
                ))}
              </select>
              {errors.category && (
                <span className="text-sm text-red-500">
                  {errors.category.message}
                </span>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Labels</label>
              <select
                {...register("labels")}
                className="w-full p-2 border rounded bg-neutral-800"
              >
                <option value="">Choose</option>
                <option value="personal">Personal</option>
                <option value="business">Business</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Date</label>
              <Controller
                name="date"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="date"
                    className={errors.date ? "border-red-500" : ""}
                  />
                )}
              />
              {errors.date && (
                <span className="text-sm text-red-500">
                  {errors.date.message}
                </span>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Time</label>
              <Controller
                name="time"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="time"
                    className={errors.time ? "border-red-500" : ""}
                  />
                )}
              />
              {errors.time && (
                <span className="text-sm text-red-500">
                  {errors.time.message}
                </span>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Payee</label>
            <Controller
              name="payee"
              control={control}
              render={({ field }) => (
                <Input {...field} placeholder="Enter payee name" />
              )}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Note</label>
            <Controller
              name="note"
              control={control}
              render={({ field }) => (
                <Textarea {...field} placeholder="Add a note" rows={3} />
              )}
            />
          </div>

          <button
            type="submit"
            className="bg-cyan-800 hover:bg-cyan-700 px-10 py-2"
          >
            Submit
          </button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ExpenseForm;
