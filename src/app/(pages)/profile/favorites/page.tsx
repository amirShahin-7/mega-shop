import FavoritesList from "@/components/favorites/FavoritesList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Favorites | MegaShop",
  description: "View and manage your favorite products",
};

export default function ProfileFavoritesPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">My Favorites</h1>
      <FavoritesList />
    </div>
  );
}
