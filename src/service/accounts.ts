import axios from "axios";
import { AddNewAccountTypes } from "@/types/types";

export const FetchAccounts = async () => {
  try {
    const data = await axios.get("/api/account");
    return data.data;
  } catch (error) {
    return error;
  }
};

export const AddNewAccount = async (data: AddNewAccountTypes) => {
  try {
    const add = await axios.post("/api/account", data);
    return add.data;
  } catch (error) {
    throw error;
  }
};
