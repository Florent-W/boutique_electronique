import { axiosRequest } from "../helpers/axios";

export async function getOrders() {
  return await axiosRequest({
    url: "/order",
    method: "GET",
  });
}