import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { RouterProvider } from "react-router-dom";
import { router } from "./routes/Router.tsx";
import MainLayout from "./layouts/MainLayout.tsx";
import { Provider } from "react-redux";
import { store } from "./store.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}>
        <MainLayout />
      </RouterProvider>
    </Provider>
  </StrictMode>
);
