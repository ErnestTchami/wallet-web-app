import {
  Car,
  ShoppingBag,
  Utensils,
  DollarSign,
  Gift,
  Lightbulb,
  Briefcase,
  Tv,
  ArrowDown,
  ArrowUp,
} from "lucide-react";
import { JSX } from "react";

type CategoryName =
  | "Freelance"
  | "Entertainment"
  | "ExternalTransfer"
  | "Food"
  | "Shopping"
  | "InternalTransfer"
  | "Transport"
  | "Salary"
  | "Investment"
  | "Gift"
  | "Utilities";

export const categoryIcons: Record<
  CategoryName,
  { icon: JSX.Element; iconBg: string }
> = {
  Freelance: {
    icon: <Briefcase className="text-white" size={20} />,
    iconBg: "bg-orange-500",
  },
  Entertainment: {
    icon: <Tv className="text-white" size={20} />,
    iconBg: "bg-red-500",
  },
  ExternalTransfer: {
    icon: <ArrowDown className="text-white" size={20} />,
    iconBg: "bg-indigo-500",
  },
  Food: {
    icon: <Utensils className="text-white" size={20} />,
    iconBg: "bg-yellow-500",
  },
  Shopping: {
    icon: <ShoppingBag className="text-white" size={20} />,
    iconBg: "bg-blue-500",
  },
  InternalTransfer: {
    icon: <ArrowUp className="text-white" size={20} />,
    iconBg: "bg-teal-500",
  },
  Transport: {
    icon: <Car className="text-white" size={20} />,
    iconBg: "bg-purple-500",
  },
  Salary: {
    icon: <DollarSign className="text-white" size={20} />,
    iconBg: "bg-green-500",
  },
  Investment: {
    icon: <Briefcase className="text-white" size={20} />,
    iconBg: "bg-cyan-500",
  },
  Gift: {
    icon: <Gift className="text-white" size={20} />,
    iconBg: "bg-pink-500",
  },
  Utilities: {
    icon: <Lightbulb className="text-white" size={20} />,
    iconBg: "bg-gray-500",
  },
};
