"use server";

import { CategoryI, ProductI } from "@/interfaces";

const API_URL = process.env.API_URL;

// Get all categories
export async function getAllCategories(): Promise<CategoryI[]> {
  try {
    const res = await fetch(`${API_URL}/categories`);

    if (!res.ok) {
      throw new Error("Failed to fetch categories");
    }

    const { data }: { data: CategoryI[] } = await res.json();
    return data || [];
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

// Get specific category
export async function getSpecificCategory(
  categoryId: string
): Promise<CategoryI | null> {
  try {
    const res = await fetch(`${API_URL}/categories/${categoryId}`);

    if (!res.ok) {
      throw new Error("Failed to fetch category");
    }

    const { data }: { data: CategoryI } = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching category:", error);
    return null;
  }
}

// Get all products in a category
export async function getAllProductCategory(
  categoryId: string
): Promise<ProductI[]> {
  try {
    const res = await fetch(`${API_URL}/products?category[in]=${categoryId}`);

    if (!res.ok) {
      throw new Error("Failed to fetch category products");
    }

    const { data }: { data: ProductI[] } = await res.json();
    return data || [];
  } catch (error) {
    console.error("Error fetching category products:", error);
    return [];
  }
}
