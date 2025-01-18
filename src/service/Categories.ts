import axios from "axios";

export const FetchAllcategories = async () => {
  try {
    const data = await axios.get("/api/categories");
    return data.data;
  } catch (error) {
    return error;
  }
};
