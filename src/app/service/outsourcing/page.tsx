import type { Metadata } from "next";
import ServicePage, { serviceMeta } from "@/pop/ServicePage";

export const metadata: Metadata = serviceMeta("outsourcing");

export default function Page() {
  return <ServicePage slug="outsourcing" />;
}
