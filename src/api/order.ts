import { axiosRequest } from "../helpers/axios";

export async function getOrders() {
  return await axiosRequest({
    url: "/order",
    method: "GET",
  });
}

export async function createOrder(
  data: {
    userId: string;
    product: string[];
    totalAmount: number;
    status: string;
  },
  token: string
) {
  return await axiosRequest({
    url: "/order",
    method: "POST",
    data,
    headers: {
      Authorization: token,
    },
  });
}
