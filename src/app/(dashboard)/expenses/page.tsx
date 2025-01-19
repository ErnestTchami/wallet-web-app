"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import UseReport from "@/hook/UseReport";
function page() {
  return (
    <div>
      <ExpensesReport />
    </div>
  );
}

export default page;

const ExpensesReport = () => {
  interface typeData {
    account: string;
    amount: string | number;
    category: string;
    createdAt: string;
    description: string;
    subcategories: string;
  }
  const formatCurrency = (amount: number) => {
    return `RWF ${amount.toLocaleString()}`;
  };
  const { data, Expenses: expenses, Income } = UseReport();

  if (!data)
    return (
      <div className="w-full h-screen flex justify-center items-center">
        Waiting...
      </div>
    );

  return (
    <div className="p-6 container ">
      <div className=" gap-6">
        <div className="">
          <Card className="border-none">
            <CardHeader>
              <CardTitle>Incomes & Expenses Report</CardTitle>
              <p className="text-xl font-semibold text-red-500">
                -RWF {data?.TotalexpencesAmount}
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="bg-neutral-700 p-4 rounded-lg">
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">Total Income</span>
                    <span>{formatCurrency(data?.TotalIncome ?? 0)}</span>
                  </div>
                  <div className="pl-4">
                    {Income?.map((data: typeData, index: number) => (
                      <div
                        key={index}
                        className="flex justify-between text-sm gap-2"
                      >
                        <div className="flex-1">
                          <p>{data?.account}</p>
                          <div className="flex justify-start gap-6 w-full">
                            <p className=" text-green-400">
                              - {data?.category}
                            </p>
                            <p className="text-neutral-500">
                              {data?.subcategories ?? data?.description}
                            </p>
                          </div>
                        </div>
                        <span>{formatCurrency(data?.amount as number)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-4">
                    <span className="font-medium">Total Expense</span>
                    <span>
                      {formatCurrency(data?.TotalexpencesAmount ?? 0)}
                    </span>
                  </div>

                  <div className="space-y-3">
                    {expenses?.map((expense, index) => (
                      <div key={index}>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <span>{expense?.icon as string}</span>
                            <span>{expense?.category}</span>
                          </div>
                          <span>{formatCurrency(expense.amount)}</span>
                        </div>
                        {expense.subcategories && expense.amount > 0 && (
                          <div className="pl-8 mt-1 space-y-1">
                            {expense.subcategories.map((sub, subIndex) => (
                              <div
                                key={subIndex}
                                className="flex justify-between text-sm text-gray-600"
                              >
                                <span>{sub.name}</span>
                                <span>{formatCurrency(sub.amount)}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
