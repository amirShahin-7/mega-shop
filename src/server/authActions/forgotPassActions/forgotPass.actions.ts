"use server";

import { ForgotPassFormFields } from "@/interfaces";
import axios, { AxiosError } from "axios";

export default async function forgotPassActions(values: ForgotPassFormFields) {
  try {
    const { data } = await axios.post(
      `${process.env.API_URL}/auth/forgotPasswords`,
      values
    );
    if (data.statusMsg == "success") {
      return {
        data,
        success: true,
        message:
          data.message || "Password reset instructions sent to your email",
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
