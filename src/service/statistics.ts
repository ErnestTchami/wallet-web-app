import axios from "axios";

export const FetchStatistics = async (date: string | Date) => {
  try {
    const formattedDate = date instanceof Date ? date : new Date(date);
    const data = await axios.get(`/api/statistics?date=${formattedDate}`);
    return data.data;
  } catch (error) {
    return error;
  }
};
