"use server";

import { ResetFormFields } from "@/interfaces";
import axios, { AxiosError } from "axios";

export default async function resetPassActions(values: ResetFormFields) {
  try {
    const { data } = await axios.put(
      `${process.env.API_URL}/auth/resetPassword`,
      values
    );
    if (data.token) {
      return {
        data,
        success: true,
        message: "Password reset successfully",
      };
    }
    return {
      success: false,
      message: data.message || "failed",
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorMsg: string = error.response?.data?.message;
      if (errorMsg) {
        return {
          success: false,
          message: "Account not found",
          errors: {
            email: errorMsg,
          },
        };
      }
      return {
        success: false,
        message: "something went wrong, please try again later",
      };
    }
  }
}
