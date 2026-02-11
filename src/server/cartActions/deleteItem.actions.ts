"use server";

import { getUserToken } from "@/helpers/getUserToken";
import axios, { AxiosError } from "axios";
import { GetCartResponse } from "@/interfaces";

export async function deleteItemAction(
  productId: string,
): Promise<GetCartResponse> {
  try {
    const token = await getUserToken();

    const { data } = await axios.delete(
      `${process.env.API_URL}/cart/${productId}`,
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
        message: "Product deleted successfully",
        numOfCartItems: data.numOfCartItems,
        cartId: data.cartId,
        data: data?.data,
      };
    } else {
      return {
        status: "error",
        message: data.message || "❌ Failed to delete product",
      };
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorMsg: string = error.response?.data?.message;

      return {
        status: "error",
        message: errorMsg || "Failed to delete product",
      };
    }

    return {
      status: "error",
      message: "Something went wrong, please try again later",
    };
  }
}
