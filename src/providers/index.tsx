import QueryClient from "@/providers/QueryClient";
import { ReactNode } from "react";

export default function Providers({ children }: { children: ReactNode }) {
  return <QueryClient>{children}</QueryClient>;
}
