import { z } from "zod";

export const shippingSchema = z.object({
  details: z
    .string()
    .min(1, { message: "Address details are required" })
    .max(100, { message: "Address details must be less than 100 characters" }),
  phone: z
    .string()
    .min(1, { message: "Phone number is required" })
    .regex(/^01[0125][0-9]{8}$/, { message: "Invalid Egyptian phone number" }),
  city: z
    .string()
    .min(1, { message: "City is required" })
    .max(50, { message: "City must be less than 50 characters" }),
  paymentMethod: z.enum(["cash", "card"] as const),
});

export type ShippingValues = z.infer<typeof shippingSchema>;
