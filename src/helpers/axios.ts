import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";

type AxiosParams = {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  data?: any;
  headers?: any;
};

export const axiosRequest = async (axiosParams: AxiosParams) => {
  try {
    const response = await axios.request(axiosParams);

    return response.data;
  } catch (error: any) {
    const messages = error?.response?.data?.errors;
    console.log(messages);

    throw new Error(messages[0] || "Une erreur est survenue");
  }
};
