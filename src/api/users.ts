import { axiosRequest } from "../helpers/axios";

export async function getUsers() {
  return await axiosRequest({
    url: "/user",
    method: "GET",
  });
}

export async function getUser(id: string) {
  return await axiosRequest({
    url: "/user/" + id,
    method: "GET",
  });
}

export async function deleteUser(id: string) {
  return await axiosRequest({
    url: "/user/" + id,
    method: "DELETE",
  });
}
