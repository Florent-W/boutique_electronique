import { axiosRequest } from "../helpers/axios";

export async function getUsers() {
  return await axiosRequest({
    url: "/user",
    method: "GET",
  });
}