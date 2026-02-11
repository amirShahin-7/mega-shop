"use server";

import axios, { AxiosError } from "axios";
import { getUserToken } from "@/helpers/getUserToken";
import { AddressResponse, UserAddress } from "@/interfaces";

export async function addAddressAction(
  address: UserAddress,
): Promise<AddressResponse> {
  try {
    const token = await getUserToken();
    const { data } = await axios.post(
      `${process.env.API_URL}/addresses`,
      address,
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
        message: data.message || "Failed to fetch addresses",
      };
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorMsg: string = error.response?.data?.message;

      return {
        message: errorMsg || "Failed to fetch addresses",
      };
    }

    return {
      message: "Something went wrong, please try again later",
    };
  }
}
