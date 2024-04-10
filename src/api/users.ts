import { User } from "../app/contexts/user.context";
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

export async function updateUser(id: string, data: User, token: string) {
  return await axiosRequest({
    url: "/user/" + id,
    method: "PATCH",
    data,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function deleteUser(id: string, token: string) {
  return await axiosRequest({
    url: "/user/" + id,
    method: "DELETE",
  });
}
