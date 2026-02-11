import { z } from "zod";

export const updateDataSchema = z
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
    phone: z
      .string()
      .nonempty("phone is required")
      .regex(/^(01)[0-2,5]{1}[0-9]{8}$/, "accept only egypt phone numbers"),
  })
