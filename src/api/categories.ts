import { axiosRequest } from "../helpers/axios";

export async function getCategories() {
  return await axiosRequest({
    url: "/category",
    method: "GET",
  });
}
