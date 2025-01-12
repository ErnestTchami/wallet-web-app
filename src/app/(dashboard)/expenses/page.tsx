import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
function page() {
  return (
    <div>
      <ExpensesReport />
    </div>
  );
}

export default page;

const ExpensesReport = () => {
  const expenses = [
    {
      category: "Food & Beverages",
      amount: 32212,
      subcategories: [
        { name: "Bar cafe", amount: 32212 },
        { name: "Groceries", amount: 0 },
        { name: "Restaurant, fast food", amount: 0 },
      ],
      icon: "🍕",
    },
    {
      category: "Shopping",
      amount: 0,
      icon: "🛍️",
      subcategories: [
        { name: "Bar cafe", amount: 32212 },
        { name: "Groceries", amount: 0 },
        { name: "Restaurant, fast food", amount: 0 },
      ],
    },
    { category: "Housing", amount: 43200, icon: "🏠" },
    { category: "Transportation", amount: 0, icon: "🚌" },
    { category: "Vehicle", amount: 0, icon: "🚗" },
    { category: "Life & Entertainment", amount: 0, icon: "🎭" },
    { category: "Communication, PC", amount: 0, icon: "💻" },
    { category: "Financial expenses", amount: 0, icon: "💰" },
    { category: "Investments", amount: 0, icon: "📈" },
    { category: "Others", amount: 0, icon: "📦" },
    { category: "Unknown", amount: 0, icon: "❓" },
  ];

  const formatCurrency = (amount: number) => {
    return `RWF ${amount.toLocaleString()}`;
  };

  return (
    <div className="p-6 container ">
      <div className=" gap-6">
        <div className="">
          <Card className="border-none">
            <CardHeader>
              <CardTitle>Incomes & Expenses Report</CardTitle>
              <p className="text-xl font-semibold text-red-500">-RWF 10,988</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="bg-neutral-700 p-4 rounded-lg">
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">Total Income</span>
                    <span>{formatCurrency(0)}</span>
                  </div>
                  <div className="pl-4">
                    <div className="flex justify-between text-sm">
                      <span>Income</span>
                      <span>{formatCurrency(0)}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-4">
                    <span className="font-medium">Total Expense</span>
                    <span>{formatCurrency(10988)}</span>
                  </div>

                  <div className="space-y-3">
                    {expenses.map((expense, index) => (
                      <div key={index}>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <span>{expense.icon}</span>
                            <span>{expense.category}</span>
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
