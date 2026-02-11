"use server";

import { RegisterFormFields } from "@/interfaces";
import axios, { AxiosError } from "axios";
import { registerSchema } from "../../../schemas/register.schema";

export default async function registerActions(values: RegisterFormFields) {
  const validationResult = registerSchema.safeParse(values);
  if (!validationResult.success) {
    const errors: Record<string, string> = {};
    if (validationResult.error) {
      validationResult.error.issues.forEach((issue) => {
        const fieldName = issue.path[0] as string;
        const message = issue.message;
        if (!errors[fieldName]) {
          errors[fieldName] = message;
        }
      });
    }
    return { success: false, errors, message: "validations errors" };
  }
  try {
    const { data } = await axios.post(
      `${process.env.API_URL}/auth/signup`,
      values
    );
    if (data.message == "success") {
      console.log(data);

      return { data, success: true, message: "Registration successfuly" };
    }
    return {
      success: false,
      message: data.message || "Registration failed",
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorMsg = error.response?.data?.message;
      if (errorMsg == "Account Already Exists") {
        return {
          success: false,
          message: "Account Exists",
          errors: {
            email: "this email is already registered",
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
