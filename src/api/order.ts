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

export async function completeOrder(orderId: string) {
  return await axiosRequest({
    url: `/order/commetuveux/${orderId}`,
    method: "PATCH",
    data: {
      status: "completed",
    },
  });
}
