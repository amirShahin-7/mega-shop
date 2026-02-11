"use server";

import axios, { AxiosError } from "axios";
import { getUserToken } from "@/helpers/getUserToken";
import { CartEmptyResponse, GetCartResponse } from "@/interfaces";

export async function getCartAction(): Promise<
  GetCartResponse | CartEmptyResponse
> {
  try {
    const token = await getUserToken();

    const { data } = await axios.get(`${process.env.API_URL}/cart`, {
      headers: {
        token: token!,
      },
    });

    if (data.status === "success") {
      return {
        status: "success",
        numOfCartItems: data.numOfCartItems || 0,
        cartId: data.cartId,
        data: data?.data,
      };
    } else {
      return {
        status: "error",
        message: data.message || "Failed to fetch Cart",
      };
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorMsg: string =
        error.response?.data?.message || error.response?.data?.statusMsg;

      return {
        status: "error",
        message: errorMsg || "Failed to fetch Cart",
      };
    }

    return {
      status: "error",
      message: "Something went wrong, please try again later",
    };
  }
}
