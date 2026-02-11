import { BrandI } from "./brandInterface";
import { CategoryI, SubcategoryI } from "./categoryInterfaces";

export interface AddToCartProps {
  variant?: "default" | "detailed";
  productPrice?: number;
  maxQuantity?: number;
  productId: string;
}

// Success Response for Add to Cart
export interface AddToCartSuccessResponse {
  status: "success";
  message: string;
  numOfCartItems: number;
  cartId: string;
  data: DataResponse;
}

export interface DataResponse {
  _id: string;
  cartOwner: string;
  products: Item[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  totalCartPrice: number;
}

export interface Item {
  count: number;
  _id: string;
  product: string; // In Add to Cart response, product is just an ID string
  price: number;
}

// Response for Get Cart, Update Count, Remove Item
export interface CartDetailsSuccessResponse {
  status: "success";
  message?: string;
  numOfCartItems: number;
  cartId: string;
  data: CartDetails;
}

export interface CartEmptyResponse {
  status: "success";
  message?: string;
  numOfCartItems: 0;
  data: CartEmptyDetails;
}

export interface CartEmptyDetails {
  products: [];
  totalCartPrice: number;
  cartOwner?: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
  _id?: string;
}

export interface CartDetails {
  _id: string;
  cartOwner: string;
  products: CartProducts[] | [];
  createdAt: string;
  updatedAt: string;
  __v: number;
  totalCartPrice: number;
}

// Unified Cart Data Type
export type CartType = CartDetails | CartEmptyDetails;

export interface CartProducts {
  count: number;
  _id: string;
  product: CartProductDetails;
  price: number;
}

export interface CartProductDetails {
  subcategory: SubcategoryI[];
  _id: string;
  title: string;
  quantity: number;
  imageCover: string;
  category: CategoryI;
  brand: BrandI;
  ratingsAverage: number;
  id: string;
}

export interface CartErrorResponse {
  status: "error" | "fail";
  statusMsg?: string;
  message: string;
}

export type AddToCartResponse = AddToCartSuccessResponse | CartErrorResponse;
export type GetCartResponse =
  | CartDetailsSuccessResponse
  | CartEmptyResponse
  | CartErrorResponse;
