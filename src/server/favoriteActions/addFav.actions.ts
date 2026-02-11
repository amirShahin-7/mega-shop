"use server";

import axios, { AxiosError } from "axios";
import { getUserToken } from "@/helpers/getUserToken";
import { AddToFavResponse } from "@/interfaces";

export async function addToFavAction(
  productId: string
): Promise<AddToFavResponse> {
  try {
    const token = await getUserToken();
    
    const { data } = await axios.post(
      `${process.env.API_URL}/wishlist`,
      { productId },
      {
        headers: {
          "Content-Type": "application/json",
          token: token!,
        },
      }
    );

    if (data.status === "success") {
      return {
        status: "success",
        message: data.message,
        data: data.data,
      };
    } else {
      return {
        status: "error",
        message: data.message || "Failed to add to favorites",
      };
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorMsg: string =
        error.response?.data?.message || error.response?.data?.statusMsg;

      return {
        status: "error",
        message: errorMsg || "Failed to add to favorites",
      };
    }

    return {
      status: "error",
      message: "Something went wrong, please try again later",
    };
  }
}
