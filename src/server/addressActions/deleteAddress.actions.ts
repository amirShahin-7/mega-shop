"use server";

import axios, { AxiosError } from "axios";
import { getUserToken } from "@/helpers/getUserToken";
import { AddressResponse } from "@/interfaces";

export async function deleteAddressAction(
  addressId: string,
): Promise<AddressResponse> {
  try {
    const token = await getUserToken();
    const { data } = await axios.delete(
      `${process.env.API_URL}/addresses/${addressId}`,
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
        message: data.message || "Failed to delete address",
      };
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorMsg: string = error.response?.data?.message;

      return {
        message: errorMsg || "Failed to delete address",
      };
    }

    return {
      message: "Something went wrong, please try again later",
    };
  }
}
