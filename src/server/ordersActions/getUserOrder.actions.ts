"use server";

import axios, { AxiosError } from "axios";
import { getUserToken } from "@/helpers/getUserToken";
import { GetUserOrderResponse } from "@/interfaces";

export async function getUserOrderAction(
  userId: string,
): Promise<GetUserOrderResponse> {
  try {
    const token = await getUserToken();
    const { data } = await axios.get(
      `${process.env.API_URL}/orders/user/${userId}`,
    );

    if (token) {
      return data;
    } else {
      return {
        statusMsg: "error",
        message: data.message || "Failed to fetch orders",
      };
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorMsg: string = error.response?.data?.message;

      return {
        statusMsg: "error",
        message: errorMsg || "Failed to fetch orders",
      };
    }

    return {
      statusMsg: "error",
      message: "Something went wrong, please try again later",
    };
  }
}
