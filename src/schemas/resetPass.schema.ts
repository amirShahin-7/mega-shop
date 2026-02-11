import { z } from "zod";
export const resetPassSchema = z.object({
  email: z
    .string()
    .nonempty("Email is required")
    .pipe(z.email("Enter a valid email address")),
  newPassword: z
    .string()
    .nonempty("Password is required")
    .min(6, "Password must be at least 6 characters"),
});
