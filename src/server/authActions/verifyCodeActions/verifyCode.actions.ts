"use server";

import { VerifyCodeFormFields } from "@/interfaces";
import axios, { AxiosError } from "axios";

export default async function verifyCodeActions(values: VerifyCodeFormFields) {
  try {
    const { data } = await axios.post(
      `${process.env.API_URL}/auth/verifyResetCode`,
      values,
    );
    if (data.status == "Success") {
      return {
        data,
        success: true,
        message: data.message || "Code verified successfully",
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
          message: "Reset code is invalid",
          errors: {
            resetCode: errorMsg,
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
