import { Order } from "../app/contexts/order.context";
import { axiosRequest } from "../helpers/axios";

export async function getOrders() {
  return await axiosRequest({
    url: "/order",
    method: "GET",
  });
}

export async function getOrder(id: string) {
  return await axiosRequest({
    url: "/order/" + id,
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

export async function updateOrder(id: string, data: Order) {
  return await axiosRequest({
    url: "/order/" + id,
    method: "PATCH",
    data,
  });
}

export async function deleteOrder(id: string) {
  return await axiosRequest({
    url: "/order/" + id,
    method: "DELETE",
  });
}
