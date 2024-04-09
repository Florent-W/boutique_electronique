import { axiosRequest } from "../helpers/axios";

export type Product = {
  id: number;
  name: string;
  categoryId: number;
  description: string;
  price: number;
  userId: string;
  image: string;
  createdAt: string;
  updatedAt: string;
};

export async function getProducts() {
  return await axiosRequest({
    url: "/product",
    method: "GET",
  });
}
