import axios from "axios";

export const FetchStatistics = async () => {
  try {
    const data = await axios.get("/api/statistics");
    return data.data;
  } catch (error) {
    return error;
  }
};
