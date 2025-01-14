import { ReactNode } from "react";
import QueryClient from "@/providers/QueryClient";

export default function Providers({ children }: { children: ReactNode }) {
  return <QueryClient>{children}</QueryClient>;
}
