import { axiosRequest } from "../helpers/axios";

export async function getProducts() {
  return await axiosRequest({
    url: "/product",
    method: "GET",
  });
}
