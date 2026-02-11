"use server";

import { getUserToken } from "@/helpers/getUserToken";
import { VerifyTokenResponse } from "@/interfaces";
import axios, { AxiosError } from "axios";

export async function verifyTokenAction(): Promise<VerifyTokenResponse> {
  try {
    const token = await getUserToken();
    if (!token) {
      return { message: "error", statusMsg: "No token found" };
    }
    const { data } = await axios.get(
      `${process.env.API_URL}/auth/verifyToken`,
      {
        headers: {
          token: token!,
        },
      },
    );
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return {
        message: "error",
        statusMsg: error.response?.data?.message || "Failed to verify token",
      };
    }
    return { message: "error", statusMsg: "Something went wrong" };
  }
}
