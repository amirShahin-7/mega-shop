"use server";

import axios, { AxiosError } from "axios";
import { getUserToken } from "@/helpers/getUserToken";
import { FavDetailsResponse } from "@/interfaces";

export async function getFavoritesAction(): Promise<FavDetailsResponse> {
  try {
    const token = await getUserToken();

    const { data } = await axios.get(`${process.env.API_URL}/wishlist`, {
      headers: {
        token: token!,
      },
    });

    if (data.status === "success") {
      return {
        status: "success",
        count: data.count || 0,
        data: data.data || [],
      };
    } else {
      return {
        status: "error",
        message: data.message || "Failed to fetch favorites",
        data: [],
      };
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorMsg: string =
        error.response?.data?.message || error.response?.data?.statusMsg;

      return {
        status: "error",
        message: errorMsg || "Failed to fetch favorites",
        data: [],
      };
    }

    return {
      status: "error",
      message: "Something went wrong, please try again later",
      data: [],
    };
  }
}
