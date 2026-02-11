"use server";

import { getUserToken } from "@/helpers/getUserToken";
import axios, { AxiosError } from "axios";
import { AddToCartResponse } from "@/interfaces";

export async function addToCartAction(
  productId: string,
): Promise<AddToCartResponse> {
  try {
    const token = await getUserToken();

    const { data } = await axios.post(
      `${process.env.API_URL}/cart`,
      { productId },
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
        message: "Product added successfully",
        numOfCartItems: data.numOfCartItems,
        cartId: data.cartId,
        data: data?.data,
      };
    } else {
      return {
        status: "error",
        message: data.message || "Failed to add to cart",
      };
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorMsg: string = error.response?.data?.message;

      return {
        status: "error",
        message: errorMsg || "Failed to add to cart",
      };
    }

    return {
      status: "error",
      message: "Something went wrong, please try again later",
    };
  }
}
