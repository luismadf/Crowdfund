import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router";
import App from "./App.tsx";
import Providers from "@/providers/index.tsx";
import { StrictMode } from "react";
import { bool } from "./constants/index.ts";
import { createRoot } from "react-dom/client";

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
        <BrowserRouter>
          <Routes>
            <Route path="/:projectId" element={<App />} />
          </Routes>
        </BrowserRouter>
      </Providers>
    </StrictMode>,
  );
});
