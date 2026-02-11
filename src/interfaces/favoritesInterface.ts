import { ProductI } from "./productInterface";

export interface AddToFavSuccessResponse {
  status: "success";
  message: string;
  data: string[];
}

export interface FavoritesErrorResponse {
  statusMsg?: "fail";
  status?: "error";
  message: string;
}

export interface FavDetailsResponse {
  status: "success" | "error";
  message?: string;
  count?: number;
  data: ProductI[];
}
export interface FavoriteItemCardProps {
  product: ProductI;
}
export interface FavoriteIconProps {
  productId: string;
  variant?: "icon" | "button";
}

export type AddToFavResponse = AddToFavSuccessResponse | FavoritesErrorResponse;
