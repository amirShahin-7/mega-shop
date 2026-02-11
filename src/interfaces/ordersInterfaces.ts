import { BrandI } from "./brandInterface";
import { CategoryI, SubcategoryI } from "./categoryInterfaces";

export interface CreateOrderResponseSuccess {
  status: string;
  data: CreateOrderDataSuccess;
}

export interface CreateOrderDataSuccess {
  taxPrice: number;
  shippingPrice: number;
  totalOrderPrice: number;
  paymentMethodType: string;
  isPaid: boolean;
  isDelivered: boolean;
  _id: string;
  user: string;
  cartItems: CreateCartItem[];
  shippingAddress: ShippingAddress;
  createdAt: string;
  updatedAt: string;
  id: number;
  __v: number;
}

export interface CreateCartItem {
  count: number;
  _id: string;
  product: string;
  price: number;
}

export interface ShippingAddress {
  details: string;
  phone: string;
  city: string;
}

// ___________________________

export type UserOrdersSuccess = UserOrdersData[];

export interface UserOrdersData {
  shippingAddress: ShippingAddress;
  taxPrice: number;
  shippingPrice: number;
  totalOrderPrice: number;
  paymentMethodType: string;
  isPaid: boolean;
  isDelivered: boolean;
  _id: string;
  user: UserInfo;
  cartItems: UserCartItem[];
  createdAt: string;
  updatedAt: string;
  id: number;
  __v: number;
}

export interface ShippingAddress {
  details: string;
  phone: string;
  city: string;
}

export interface UserInfo {
  _id: string;
  name: string;
  email: string;
  phone: string;
}

export interface UserCartItem {
  count: number;
  _id: string;
  product: ProductCartItem;
  price: number;
}

export interface ProductCartItem {
  subcategory: SubcategoryI[];
  ratingsQuantity: number;
  _id: string;
  title: string;
  imageCover: string;
  category: CategoryI;
  brand: BrandI;
  ratingsAverage: number;
  id: string;
}

// ___________________________

export interface CheckoutResponseSuccess {
  status: string;
  session: Session;
}

export interface Session {
  url: string;
  success_url: string;
  cancel_url: string;
}

export interface MainOrderResponseError {
  statusMsg: string;
  message: string;
}

export type GetUserOrderResponse = UserOrdersSuccess | MainOrderResponseError;
export type CheckoutResponse = CheckoutResponseSuccess | MainOrderResponseError;
export type CreateOrderResponse =
  | CreateOrderResponseSuccess
  | MainOrderResponseError;
