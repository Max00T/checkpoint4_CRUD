// Import necessary modules from React and React Router
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

/* ************************************************************************* */
import { getAllCds } from "./services/request";

/* ************************************************************************* */

// Import the main app component
import App from "./App";

// Import additional components for new routes
import Home from "./pages/Home";
import ManageCd from "./pages/ManageCd";
import DeleteCd from "./pages/DeleteCd";
// Try creating these components in the "pages" folder

/* ************************************************************************* */

// Create router configuration with routes
// You can add more routes as you build out your app!
const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
        loader: async () => {
          try {
            return await getAllCds();
          } catch (error) {
            console.error("Erreur de chargement des CDs :", error);
            return []; // Retourne un tableau vide en cas d'erreur
          }
        },
      },
      // {
      //   path: "/manage",
      // },

      {
        path: "/manage",
        element: <ManageCd />,
        loader: async () => {
          try {
            return await getAllCds(); // Charge les CDs existants
          } catch (error) {
            console.error("Erreur de chargement des CDs :", error);
            return [];
          }
        },
      },

      {
        path: "/delete",
        element: <DeleteCd />,
        loader: async () => {
          try {
            return await getAllCds(); // Charge les CDs
          } catch (error) {
            console.error("Erreur de chargement des CDs :", error);
            return []; // Retourne un tableau vide en cas d'erreur
          }
        },
      },
    ],
  },
]);

/* ************************************************************************* */

// Find the root element in the HTML document
const rootElement = document.getElementById("root");
if (rootElement == null) {
  throw new Error(`Your HTML Document should contain a <div id="root"></div>`);
}

// Render the app inside the root element
createRoot(rootElement).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);

/**
 * Helpful Notes:
 *
 * 1. Adding More Routes:
 *    To add more pages to your app, first create a new component (e.g., About.tsx).
 *    Then, import that component above like this:
 *
 *    import About from "./pages/About";
 *
 *    Add a new route to the router:
 *
 *      {
 *        path: "/about",
 *        element: <About />,  // Renders the About component
 *      }
 *
 * 2. Try Nested Routes:
 *    For more complex applications, you can nest routes. This lets you have sub-pages within a main page.
 *    Documentation: https://reactrouter.com/en/main/start/tutorial#nested-routes
 *
 * 3. Experiment with Dynamic Routes:
 *    You can create routes that take parameters (e.g., /users/:id).
 *    Documentation: https://reactrouter.com/en/main/start/tutorial#url-params-in-loaders
 */
