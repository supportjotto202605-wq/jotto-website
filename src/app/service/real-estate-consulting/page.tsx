import type { Metadata } from "next";
import ServicePage, { serviceMeta } from "@/pop/ServicePage";

export const metadata: Metadata = serviceMeta("real-estate-consulting");

export default function Page() {
  return <ServicePage slug="real-estate-consulting" />;
}
