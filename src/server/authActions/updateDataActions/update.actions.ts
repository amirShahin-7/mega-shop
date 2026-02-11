"use server";

import { getUserToken } from "@/helpers/getUserToken";
import { UpdateDataFormFields } from "@/interfaces";
import axios, { AxiosError } from "axios";

export default async function updateDataActions(values: UpdateDataFormFields) {
  const token = await getUserToken();
  console.log(token);

  try {
    const { data } = await axios.put(
      `${process.env.API_URL}/users/updateMe`,
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
        message: "Data updated successfully",
      };
    }
    return {
      success: false,
      message: data.message || "failed",
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorMsg: string = error.response?.data?.errors.msg;

      if (errorMsg) {
        return {
          success: false,
          message: "Email is already in use",
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
