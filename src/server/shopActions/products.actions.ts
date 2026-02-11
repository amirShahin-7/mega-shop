"use server";

import { ProductI } from "@/interfaces";

const API_URL = process.env.API_URL;

// Get all products this is the same featcherd products
export async function getAllProducts(): Promise<ProductI[]> {
  try {
    const res = await fetch(`${API_URL}/products`, {
      next: { revalidate: 3600 },
    });

    const { data }: { data: ProductI[] } = await res.json();
    if (!data) {
      throw new Error("Failed to fetch products");
    }
    return data || [];
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

// Get specific product by ID
export async function getSpecificProduct(
  productId: string,
): Promise<ProductI | null> {
  try {
    const res = await fetch(`${API_URL}/products/${productId}`, {
      next: { revalidate: 3600 },
    });

    const { data }: { data: ProductI } = await res.json();
    if (!data) {
      throw new Error("Failed to fetch product");
    }
    return data;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

// Get related products by category ~You May Also Like
export async function getRelatedProducts(
  categoryId: string,
  currentProductId: string,
  limit: number = 8,
): Promise<ProductI[]> {
  try {
    const res = await fetch(
      `${API_URL}/products?category[in]=${categoryId}&limit=${limit}`,
    );

    const { data }: { data: ProductI[] } = await res.json();
    if (!data) {
      throw new Error("Failed to fetch related products");
    }

    // Filter out current product
    return data.filter((product) => product.id !== currentProductId) || [];
  } catch (error) {
    console.error("Error fetching related products:", error);
    return [];
  }
}

// Search products by keyword and/or price
export async function searchProducts(
  keyword?: string,
  maxPrice?: number,
  limit: number = 20,
): Promise<ProductI[]> {
  try {
    const params = new URLSearchParams();

    if (keyword && keyword.trim() !== "") {
      params.append("keyword", keyword.trim());
    }

    if (maxPrice && maxPrice > 0) {
      params.append("price[lte]", maxPrice.toString());
    }

    // If no criteria provided, return empty
    if (params.toString() === "") {
      return [];
    }

    params.append("limit", limit.toString());

    const res = await fetch(`${API_URL}/products?${params.toString()}`, {
      next: { revalidate: 1800 },
    });

    const { data }: { data: ProductI[] } = await res.json();
    if (!data) {
      throw new Error("Failed to search products");
    }

    return data || [];
  } catch (error) {
    console.error("Error searching products:", error);
    return [];
  }
}

// Get products on sale (with discount)
export async function getProductsOnSale(
  limit: number = 8,
): Promise<ProductI[]> {
  try {
    const res = await fetch(`${API_URL}/products?limit=${limit}`, {
      next: { revalidate: 1800 },
    });

    const { data }: { data: ProductI[] } = await res.json();
    if (!data) {
      throw new Error("Failed to fetch products on sale");
    }

    // Filter products with discount
    return (
      data.filter(
        (product) =>
          product.priceAfterDiscount &&
          product.priceAfterDiscount < product.price,
      ) || []
    );
  } catch (error) {
    console.error("Error fetching products on sale:", error);
    return [];
  }
}
