import axios from "axios";

const API = `${process.env.NEXT_PUBLIC_API_URL}/api/orders`;

export const createOrder = async (orderData: {
  email: string;
  phone: string;
  address: string;
  items: { id: number; quantity: number }[];
}) => {
  const res = await axios.post(API, orderData);
  return res.data;
};
