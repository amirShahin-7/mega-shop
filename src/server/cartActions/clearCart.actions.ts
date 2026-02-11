"use server";

import { getUserToken } from "@/helpers/getUserToken";
import axios, { AxiosError } from "axios";

export async function clearCartAction(): Promise<{
  status: "success" | "error";
  message: string;
}> {
  try {
    const token = await getUserToken();

    const { data } = await axios.delete(`${process.env.API_URL}/cart`, {
      headers: {
        "Content-Type": "application/json",
        token: token!,
      },
    });

    if (data?.status === "success") {
      return {
        status: "success",
        message: "Cart cleared successfully",
      };
    } else {
      return {
        status: "error",
        message: data.message || "❌ Failed to clear cart",
      };
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorMsg: string = error.response?.data?.message;

      return {
        status: "error",
        message: errorMsg || "Failed to clear cart",
      };
    }

    return {
      status: "error",
      message: "Something went wrong, please try again later",
    };
  }
}
