import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  HomeIcon,
  Coffee,
  ShoppingBag,
  Car,
  Smartphone,
  Utensils,
} from "lucide-react";

const LastRecordedComponents = () => {
  // Extended sample data to demonstrate scrolling
  const transactions = [
    {
      id: 1,
      icon: <Coffee className="text-white" size={20} />,
      iconBg: "bg-red-500",
      title: "Bar, cafe",
      type: "Cash",
      amount: 32212,
      isExpense: false,
      time: "4 hours ago",
    },
    {
      id: 2,
      icon: <HomeIcon className="text-white" size={20} />,
      iconBg: "bg-orange-500",
      title: "Housing",
      type: "Cash",
      amount: 43200,
      isExpense: true,
      time: "4 hours ago",
    },
    {
      id: 3,
      icon: <ShoppingBag className="text-white" size={20} />,
      iconBg: "bg-blue-500",
      title: "Shopping",
      type: "Card",
      amount: 15000,
      isExpense: true,
      time: "5 hours ago",
    },
    {
      id: 4,
      icon: <Car className="text-white" size={20} />,
      iconBg: "bg-purple-500",
      title: "Transport",
      type: "Cash",
      amount: 8500,
      isExpense: true,
      time: "6 hours ago",
    },
    {
      id: 5,
      icon: <Smartphone className="text-white" size={20} />,
      iconBg: "bg-green-500",
      title: "Phone bill",
      type: "Card",
      amount: 12000,
      isExpense: true,
      time: "8 hours ago",
    },
    {
      id: 6,
      icon: <Utensils className="text-white" size={20} />,
      iconBg: "bg-yellow-500",
      title: "Restaurant",
      type: "Card",
      amount: 25000,
      isExpense: true,
      time: "1 day ago",
    },
  ];

  const formatAmount = (amount: number, isExpense: boolean) => {
    return `${isExpense ? "-" : ""}RWF ${amount.toLocaleString()}`;
  };

  return (
    <Card className="w-full border-none rounded-none">
      <CardContent className="p-0 border-none rounded-none w-full max-h-[300px] scrollbar-hidden overflow-y-auto">
        {transactions.map((transaction) => (
          <div
            key={transaction.id}
            className="flex border-b  items-center justify-between p-4  hover:bg-neutral-700"
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-full ${transaction.iconBg}`}>
                {transaction.icon}
              </div>
              <div>
                <h3 className="font-medium">{transaction.title}</h3>
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-red-500"></span>
                  <span className="text-sm text-gray-500">
                    {transaction.type}
                  </span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div
                className={`font-medium ${
                  transaction.isExpense ? "text-red-500" : "text-green-500"
                }`}
              >
                {formatAmount(transaction.amount, transaction.isExpense)}
              </div>
              <div className="text-sm text-gray-500">{transaction.time}</div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default LastRecordedComponents;
