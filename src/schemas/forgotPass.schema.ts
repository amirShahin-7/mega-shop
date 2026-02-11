import { z } from "zod";
export const forgotPassSchema = z.object({
  email: z
    .string()
    .nonempty("Email is required")
    .pipe(z.email("Enter a valid email address")),
});
