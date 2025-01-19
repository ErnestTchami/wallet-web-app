import React, { useState } from "react";
import {
  ArrowRightLeft,
  CircleDollarSign,
  CreditCard,
  LayoutDashboard,
} from "lucide-react";
import UseStatistics from "./useStatistics";

function UseDashboard() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const { data } = UseStatistics(selectedDate);
  const CardData = [
    {
      Name: "Accounts",
      Description: "This is your account",
      icons: <CreditCard size={40} />,
      number: data?.Response.AccountsCount ?? 0,
    },
    {
      Name: "Transaction",
      Description: `Total Transaction ${data?.Response.TotalTransaction} in this month`,
      icons: <ArrowRightLeft size={40} />,
      number: data?.Response.TotalTransaction ?? 0,
    },
    {
      Name: "Category",
      Description: "All categolies",
      icons: <LayoutDashboard size={40} />,
      number: data?.Response.category ?? 0,
    },
    {
      Name: "Amount Available",
      Description: `${data?.Response.TotalAmount} RWF`,
      icons: <CircleDollarSign size={40} />,
    },
  ];
  const handleDateChange = (newDate: Date) => {
    setSelectedDate(newDate);
  };
  return {
    selectedDate,
    handleDateChange,
    CardData,
    data,
  };
}

export default UseDashboard;
