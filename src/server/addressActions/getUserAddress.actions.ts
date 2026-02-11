"use server";

import axios, { AxiosError } from "axios";
import { getUserToken } from "@/helpers/getUserToken";
import { GetUserAddressesResponse } from "@/interfaces";

export async function getUserAddressesAction(): Promise<GetUserAddressesResponse> {
  try {
    const token = await getUserToken();
    const { data } = await axios.get(`${process.env.API_URL}/addresses`, {
      headers: {
        token: token!,
      },
    });

    if (data.status === "success") {
      return data;
    } else {
      return {
        statusMsg: "fail",
        message: data.message || "Failed to fetch addresses",
      };
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorMsg: string = error.response?.data?.message;

      return {
        statusMsg: "fail",
        message: errorMsg || "Failed to fetch addresses",
      };
    }

    return {
      statusMsg: "fail",
      message: "Something went wrong, please try again later",
    };
  }
}
