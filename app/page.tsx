import { Metadata } from "next";
import { Storefront } from "@/components/storefront";
import { AdminDashboard } from "@/components/admin-dashboard";

export const metadata: Metadata = {
  title: "NovaCart | Storefront & Admin",
  description: "Modern storefront with an integrated admin dashboard.",
};

export default function HomePage() {
  return <Storefront />;
}
