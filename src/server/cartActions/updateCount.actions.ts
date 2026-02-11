"use server";

import { getUserToken } from "@/helpers/getUserToken";
import axios, { AxiosError } from "axios";
import { GetCartResponse } from "@/interfaces";

export async function updateCountAction(
  productId: string,
  count: number,
): Promise<GetCartResponse> {
  try {
    const token = await getUserToken();

    const { data } = await axios.put(
      `${process.env.API_URL}/cart/${productId}`,
      { count },
      {
        headers: {
          "Content-Type": "application/json",
          token: token!,
        },
      },
    );

    if (data?.status === "success") {
      return {
        status: "success",
        message: "Product count updated successfully",
        numOfCartItems: data.numOfCartItems,
        cartId: data.cartId,
        data: data?.data,
      };
    } else {
      return {
        status: "error",
        message: data.message || "Failed to update count",
      };
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorMsg: string = error.response?.data?.message;

      return {
        status: "error",
        message: errorMsg || "Failed to update count",
      };
    }

    return {
      status: "error",
      message: "Something went wrong, please try again later",
    };
  }
}
