import {
  QueryClientProvider,
  QueryClient as _QueryClient,
} from "@tanstack/react-query";
import { ReactNode } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const client = new _QueryClient();

export default function QueryClient({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={client}>
      <ReactQueryDevtools />
      {children}
    </QueryClientProvider>
  );
}
