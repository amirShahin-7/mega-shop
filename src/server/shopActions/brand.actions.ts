"use server";

import { BrandI, ProductI } from "@/interfaces";

const API_URL = process.env.API_URL;

// Get all brands
export async function getAllBrands(): Promise<BrandI[]> {
  try {
    const res = await fetch(`${API_URL}/brands`);

    if (!res.ok) {
      throw new Error("Failed to fetch brands");
    }

    const { data }: { data: BrandI[] } = await res.json();
    return data || [];
  } catch (error) {
    console.error("Error fetching brands:", error);
    return [];
  }
}

export async function getSpecificBrand(
  brandId: string
): Promise<BrandI | null> {
  try {
    const res = await fetch(`${API_URL}/brands/${brandId}`);

    if (!res.ok) {
      throw new Error("Failed to fetch brand");
    }

    const { data }: { data: BrandI } = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching brand:", error);
    return null;
  }
}

export async function getAllProductBrand(brandId: string): Promise<ProductI[]> {
  try {
    const res = await fetch(`${API_URL}/products?brand=${brandId}`, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch brand products");
    }

    const { data }: { data: ProductI[] } = await res.json();
    return data || [];
  } catch (error) {
    console.error("Error fetching brand products:", error);
    return [];
  }
}
