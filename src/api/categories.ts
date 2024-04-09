import { axiosRequest } from "../helpers/axios";

export type Category = {
  id: string;
  name: string;
  description: string;
  image: string;
  createdAt: string;
  updatedAt: string;
};

export async function getCategories(): Promise<Category[]> {
  return await axiosRequest({
    url: "/category",
    method: "GET",
  });
}
