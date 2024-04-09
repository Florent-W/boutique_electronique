import { axiosRequest } from "../helpers/axios";

export async function createPayment(
  amount: number,
  token: string,
  userId: string
) {
  return await axiosRequest({
    url: "/payment",
    method: "POST",
    headers: {
      Authorization: token,
    },
    data: {
      amount,
      userId,
    },
  });
}
