"use client";

import React from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const accountSchema = z.object({
  name: z.string().nonempty("Name is required"),
  color: z.enum(["emerald", "blue", "red"]),
  accountType: z.enum(["General", "Savings", "Checking"]),
  initialAmount: z
    .string()
    .refine(
      (val) => /^0$|^[1-9]\d*$/.test(val),
      "Initial amount must be a valid number."
    ),
  currency: z.enum(["RWF", "USD", "EUR"]),
  excludeFromStats: z.boolean(),
});

const AddAccountModal = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      name: "",
      color: "emerald",
      accountType: "General",
      initialAmount: "0",
      currency: "RWF",
      excludeFromStats: false,
    },
  });

  const onSubmit = (data: unknown) => {
    console.log("Account data:", data);
  };

  return (
    <Card className="w-full max-w-md mx-auto border-none">
      <CardContent className="space-y-4 py-4">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm mb-1">Name</label>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Account name"
                    className={errors.name ? "border-red-500" : ""}
                  />
                )}
              />
              {errors.name && (
                <span className="text-sm text-red-500">
                  {errors.name.message}
                </span>
              )}
            </div>
            <div className="w-32">
              <label className="block text-sm mb-1">Color</label>
              <Controller
                name="color"
                control={control}
                render={({ field }) => (
                  <select
                    {...field}
                    className="w-full px-3 py-2 border rounded-md"
                  >
                    <option value="emerald">Emerald</option>
                    <option value="blue">Blue</option>
                    <option value="red">Red</option>
                  </select>
                )}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm mb-1">Account Type</label>
            <Controller
              name="accountType"
              control={control}
              render={({ field }) => (
                <select
                  {...field}
                  className="w-full px-3 py-2 border rounded-md"
                >
                  <option value="General">General</option>
                  <option value="Savings">Savings</option>
                  <option value="Checking">Checking</option>
                </select>
              )}
            />
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm mb-1">Initial Amount</label>
              <Controller
                name="initialAmount"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="text"
                    className={errors.initialAmount ? "border-red-500" : ""}
                  />
                )}
              />
              {errors.initialAmount && (
                <span className="text-sm text-red-500">
                  {errors.initialAmount.message}
                </span>
              )}
            </div>
            <div className="w-32">
              <label className="block text-sm mb-1">Currency</label>
              <Controller
                name="currency"
                control={control}
                render={({ field }) => (
                  <select
                    {...field}
                    className="w-full px-3 py-2 border rounded-md"
                  >
                    <option value="RWF">RWF</option>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                  </select>
                )}
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-500 text-white py-2 rounded-md hover:bg-emerald-600 transition-colors"
          >
            Save
          </button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddAccountModal;
