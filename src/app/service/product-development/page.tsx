import type { Metadata } from "next";
import ServicePage, { serviceMeta } from "@/pop/ServicePage";

export const metadata: Metadata = serviceMeta("product-development");

export default function Page() {
  return <ServicePage slug="product-development" />;
}
