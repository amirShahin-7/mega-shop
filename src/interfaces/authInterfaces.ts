import { forgotPassSchema } from "@/schemas/forgotPass.schema";
import { loginSchema } from "@/schemas/login.schema";
import { registerSchema } from "@/schemas/register.schema";
import { resetPassSchema } from "@/schemas/resetPass.schema";
import { updateDataSchema } from "@/schemas/updateData.schema";
import { updatePassSchema } from "@/schemas/updatePass.schema";
import { verifyCodeSchema } from "@/schemas/verifyCode.schema";
import { z } from "zod";

export type RegisterFormFields = z.infer<typeof registerSchema>;
export type LoginFormFields = z.infer<typeof loginSchema>;
export type ForgotPassFormFields = z.infer<typeof forgotPassSchema>;
export type VerifyCodeFormFields = z.infer<typeof verifyCodeSchema>;
export type ResetFormFields = z.infer<typeof resetPassSchema>;
export type UpdateDataFormFields = z.infer<typeof updateDataSchema>;
export type UpdatePassFormFields = z.infer<typeof updatePassSchema>;

export interface LoginResponseISuccess {
  message: string;
  user: UserResponse;
  token: string;
}

export interface UserResponse {
  name: string;
  email: string;
  role: string;
}
export interface LoginResponseIFail {
  statusMsg: string;
  message: string;
}
