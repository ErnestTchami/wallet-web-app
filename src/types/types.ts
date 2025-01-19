import { z } from "zod";

const amountSchema = z.string().refine(
  (val) => {
    return /^0$|^[1-9]\d*$/.test(val);
  },
  {
    message:
      "Amount must be a number and cannot start with zero (except for '0').",
  }
);
export const formSchema = z.object({
  type: z.enum(["Expense", "Income", "Transfer"]),
  account: z.string().nonempty("Account is required"),
  amount: amountSchema,
  currency: z.string(),
  category: z.string().nonempty("Category is required"),
  subcategories: z.string().optional(),
  date: z.string().nonempty("Date is required"),
  time: z.string().nonempty("Time is required"),
  payee: z.string().optional(),
  note: z.string().optional(),
});

interface TypeDataTypes {
  Expense: number;
  Income: number;
  Transfer: number;
}
export const typesData: TypeDataTypes = {
  Expense: 1,
  Income: 2,
  Transfer: 3,
};

export type TransactionMutationData = {
  type: string;
  account: string;
  amount: string;
  currency: string;
  category: string;
  subcategories: string[] | string;
  date: string;
  time: string;
  payee: string;
  note: string;
};

export interface Transaction {
  CreatedAt: string;
  amount: string;
  categoryName: string;
  id: string;
  note: string;
  type?: string;
  account: string;
}

export interface AddNewAccountTypes {
  name: string;
  accountType: string;
  initialAmount: string;
  currency: string;
  excludeFromStats: boolean;
}

export type ReportDataType = {
  category: string;
  categoryId: string;
  amount: string;
  subcategories: string;
  description: string;
  createdAt: string;
};
