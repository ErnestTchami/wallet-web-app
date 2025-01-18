"use client";
import React from "react";
import { Controller } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import UseExpense from "@/hook/UseExpense";

const ExpenseForm = () => {
  const {
    control,
    errors,
    getCategories,
    handleSubmit,
    onSubmit,
    register,
    setValue,
    watch,
    accounts,
    isPending,
    subcategories,
  } = UseExpense();
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
                {accounts ? (
                  accounts?.map((data, index) => (
                    <option
                      key={index}
                      value={data.accountId as string}
                      className="bg-inherit"
                    >
                      {data.name}
                    </option>
                  ))
                ) : (
                  <option key={0} value={""} className="bg-inherit">
                    waiting ...
                  </option>
                )}
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
                {getCategories().length ? (
                  getCategories().map((cat: { name: string; id: string }) => (
                    <option key={cat.name} value={cat.id}>
                      {cat.name}
                    </option>
                  ))
                ) : (
                  <option key={"cat.name"} value={undefined}>
                    waiting ...
                  </option>
                )}
              </select>
              {errors.category && (
                <span className="text-sm text-red-500">
                  {errors.category.message}
                </span>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">subcategories</label>
              <select
                {...register("subcategories")}
                className="w-full p-2 border rounded bg-neutral-800"
              >
                <option value="">Choose</option>
                {subcategories.length ? (
                  subcategories?.map((cat: { name: string; id: string }) => (
                    <option key={cat.name} value={cat.id}>
                      {cat?.name}
                    </option>
                  ))
                ) : (
                  <option key={123} value={undefined}>
                    waiting ...
                  </option>
                )}
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
            disabled={isPending}
            type="submit"
            className="bg-cyan-800 hover:bg-cyan-700 px-10 py-2"
          >
            {isPending ? "Loading ..." : "Submit"}
          </button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ExpenseForm;
