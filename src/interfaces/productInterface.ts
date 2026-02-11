import { BrandI } from "./brandInterface";
import { CategoryI, SubcategoryI } from "./categoryInterfaces";

export interface ProductI {
  sold?: any;
  images: string[];
  subcategory: SubcategoryI[];
  ratingsQuantity: number;
  _id: string;
  title: string;
  slug: string;
  description: string;
  quantity: number;
  price: number;
  priceAfterDiscount?: number;
  imageCover: string;
  category: CategoryI;
  brand: BrandI;
  ratingsAverage: number;
  createdAt: string;
  updatedAt: string;
  __v?: number;
  reviews?: any[];
  id: string;
}
