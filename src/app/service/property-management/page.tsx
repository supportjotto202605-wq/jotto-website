import type { Metadata } from "next";
import ServicePage, { serviceMeta } from "@/pop/ServicePage";

export const metadata: Metadata = serviceMeta("property-management");

export default function Page() {
  return <ServicePage slug="property-management" />;
}
