"use server";

import axios, { AxiosError } from "axios";
import { getUserToken } from "@/helpers/getUserToken";
import { CheckoutResponse, ShippingAddress } from "@/interfaces";

export async function checkoutSessionAction(
  cartId: string,
  { shippingAddress }: { shippingAddress: ShippingAddress },
): Promise<CheckoutResponse> {
  try {
    const token = await getUserToken();
    const { data } = await axios.post(
      `${process.env.API_URL}/orders/checkout-session/${cartId}?url=https://mega-shop-liard.vercel.app`,
      shippingAddress,
      {
        headers: {
          token: token!,
        },
      },
    );

    if (data.status === "success") {
      return data;
    } else {
      return {
        statusMsg: "error",
        message: data.message || "Failed to fetch orders",
      };
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorMsg: string = error.response?.data?.message;

      return {
        statusMsg: "error",
        message: errorMsg || "Failed to fetch orders",
      };
    }

    return {
      statusMsg: "error",
      message: "Something went wrong, please try again later",
    };
  }
}
