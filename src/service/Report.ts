import axios from "axios";

export const FetchReport = async () => {
  try {
    const data = await axios.get("/api/report");
    return data.data;
  } catch (error) {
    return error;
  }
};
