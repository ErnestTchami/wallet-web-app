import { TransactionMutationData } from "@/types/types";
import axios from "axios";

export const FetchAllcategories = async () => {
  try {
    const data = await axios.get("/api/transaction");
    return data.data;
  } catch (error) {
    return error;
  }
};

export const AddNewTransaction = async (data: TransactionMutationData) => {
  try {
    const add = await axios.post("/api/transaction", data);
    return add.data;
  } catch (error) {
    throw error;
  }
};
