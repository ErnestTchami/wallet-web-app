import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Briefcase } from "lucide-react";
import { categoryIcons } from "@/lib/utils/CategolieIcons";
import { Transaction } from "@/types/types";
import { formatTimeAgo } from "@/lib/utils/FormatTime";

const LastRecordedComponents = ({
  transactionsData,
}: {
  transactionsData: Transaction[] | undefined;
}) => {
  const transactions = transactionsData?.map((item, index) => {
    const category = categoryIcons[
      item.categoryName as keyof typeof categoryIcons
    ] || {
      icon: <Briefcase className="text-white" size={20} />,
      iconBg: "bg-gray-500",
    };

    return {
      id: index + 1,
      icon: category.icon,
      iconBg: category.iconBg,
      title: item.categoryName,
      type: "Cash",
      amount: parseFloat(item.amount),
      isExpense: item.type === "2" ? false : true,
      time: formatTimeAgo(item.CreatedAt),
    };
  });

  return (
    <Card className="w-full border-none rounded-none">
      <CardContent className="p-0 border-none rounded-none w-full max-h-[300px] scrollbar-hidden overflow-y-auto">
        {transactions ? (
          transactions?.map((transaction) => (
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
                  {transaction.isExpense
                    ? -transaction.amount
                    : transaction.amount}
                </div>
                <div className="text-sm text-gray-500">{transaction.time}</div>
              </div>
            </div>
          ))
        ) : (
          <div className="min-h-56 flex items-center justify-center">
            Loading ....
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default LastRecordedComponents;
