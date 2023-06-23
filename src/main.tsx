import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./Router/router.tsx";
import AuthProviders from "./providers/AuthProviders.tsx";
import RefetchProvider from "./providers/RefetchProvider.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RefetchProvider>
      <AuthProviders>
        <RouterProvider router={router} />
      </AuthProviders>
    </RefetchProvider>
  </React.StrictMode>
);
