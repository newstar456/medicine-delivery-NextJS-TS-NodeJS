import axios from "axios";

const API = `${process.env.NEXT_PUBLIC_API_URL}/api/drugstores`;

export const getDrugstores = async () => {
  const res = await axios.get(API);
  return res.data;
};