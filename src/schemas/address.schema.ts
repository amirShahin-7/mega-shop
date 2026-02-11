import { z } from "zod";

export const addressSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters" })
    .max(50, { message: "Name must be less than 50 characters" }),
  details: z
    .string()
    .min(5, { message: "Address details are required" })
    .max(100, { message: "Address details must be less than 100 characters" }),
  phone: z
    .string()
    .min(1, { message: "Phone number is required" })
    .regex(/^01[0125][0-9]{8}$/, { message: "Invalid Egyptian phone number" }),
  city: z
    .string()
    .min(2, { message: "City is required" })
    .max(50, { message: "City must be less than 50 characters" }),
});

export type AddressValues = z.infer<typeof addressSchema>;
