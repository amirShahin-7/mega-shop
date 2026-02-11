import { z } from "zod";

export const registerSchema = z
  .object({
    name: z
      .string()
      .nonempty("Name is required")
      .min(3, "Name must be at least 3 characters")
      .max(25, "Name must be at most 25 characters"),
    email: z
      .string()
      .nonempty("Email is required")
      .pipe(z.email("Enter a valid email address")),
    password: z
      .string()
      .nonempty("Password is required")
      .min(6, "Password must be at least 6 characters"),
    rePassword: z.string().min(6, "Confirm your password"),
    phone: z
      .string()
      .nonempty("phone is required")
      .regex(/^(01)[0-2,5]{1}[0-9]{8}$/, "accept only egypt phone numbers"),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "Password confirmation is incorrect",
    path: ["rePassword"],
  });
