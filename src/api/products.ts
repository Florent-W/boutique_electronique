import { axiosRequest } from "../helpers/axios";

export type Product = {
  id: string;
  name: string;
  categoryId: string;
  description: string;
  price: number;
  status: number;
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

export async function createProduct(
  data: {
    name: string;
    categoryId: string;
    description: string;
    price: number;
    userId: string;
    image: string;
  },
  token: string
) {
  return await axiosRequest({
    url: "/product",
    method: "POST",
    data,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
