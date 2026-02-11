"use server";

import { getUserToken } from "@/helpers/getUserToken";
import { UpdatePassFormFields } from "@/interfaces";
import axios, { AxiosError } from "axios";

export default async function updatePassActions(values: UpdatePassFormFields) {
  const token = await getUserToken();
  try {
    const { data } = await axios.put(
      `${process.env.API_URL}/users/changeMyPassword`,
      values,
      {
        headers: {
          token: token!,
        },
      }
    );
    if (data.message == "success") {
      return {
        data,
        success: true,
        message: "Password updated successfully",
      };
    }
    return {
      success: false,
      message: data.message || "failed",
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorMsg = error.response?.data?.errors.msg;

      if (errorMsg) {
        return {
          success: false,
          message: "failed",
          errors: {
            message: errorMsg,
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
