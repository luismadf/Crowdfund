import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { bool } from "./constants/index.ts";
import Providers from "@/providers/index.tsx";

async function enableMocking() {
  if (import.meta.env.VITE_ENABLE_MOCK_API === bool.TRUE) {
    const { worker } = await import("@/mocks/browser.ts");
    return worker.start();
  } else {
    Promise.resolve();
  }
}

enableMocking().then(() => {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <Providers>
        <App />
      </Providers>
    </StrictMode>,
  );
});
