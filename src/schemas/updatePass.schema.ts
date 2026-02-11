import { z } from "zod";

export const updatePassSchema = z
  .object({
    currentPassword: z
      .string()
      .nonempty("Password is required")
      .min(6, "Password must be at least 6 characters"),
    password: z
      .string()
      .nonempty("Password is required")
      .min(6, "Password must be at least 6 characters"),
    rePassword: z.string().min(6, "Confirm your password"),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "Password confirmation is incorrect",
    path: ["rePassword"],
  });
