import { router } from "./router/Router";
import {createRoot} from "react-dom/client";
import { RouterProvider } from "react-router-dom";

const root = document.getElementById("root");

if (!root) {
    throw new Error("root not found");
}

const container = createRoot(root);

container.render(
    <RouterProvider router={router} />
)
/* (подключаем в index.tsx) */

