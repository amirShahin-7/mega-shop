import { z } from "zod";
export const verifyCodeSchema = z.object({
  resetCode: z.string().min(6, {
    error: "Reset code must be 6 characters.",
  }),
});
