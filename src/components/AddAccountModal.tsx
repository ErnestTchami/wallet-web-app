"use client";
import React from "react";
import { Controller } from "react-hook-form";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import UseAddAccount from "@/hook/UseAddAccount";

const AddAccountModal = () => {
  const { control, errors, handleSubmit, onSubmit, isPending } =
    UseAddAccount();
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
          </div>

          {/* <div>
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
          </div> */}

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
                    className="w-full px-3 py-2 border rounded-md bg-neutral-800"
                  >
                    <option value="RWF">RWF</option>
                  </select>
                )}
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-500 text-white py-2 rounded-md hover:bg-emerald-600 transition-colors"
          >
            {isPending ? "Loading..." : "Save"}
          </button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddAccountModal;
