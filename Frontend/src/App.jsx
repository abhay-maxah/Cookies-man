import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./pages/Root";
import ErrorPage from "./pages/Error";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Cookies from "./pages/Cookies";
import Chocolates from "./pages/Chocolates";
import { action as Authlogout } from "./pages/Logout";
import Cart from "./pages/Cart";
import AddProduct from "./components/AddProduct";
import ProductDetail from "./components/ProductDetail";
import { AuthProvider } from "./util/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

// Custom error loader function
const errorLoader = async ({ request }) => {
  // Simulate error scenarios based on request URL
  if (request.url.includes("/forbidden")) {
    throw new Response("Forbidden", { status: 403 });
  }
  if (request.url.includes("/unauthorized")) {
    throw new Response("Unauthorized", { status: 401 });
  }
  throw new Response("Not Found", { status: 404 });
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />, // Global error page
    id: "root",
    children: [
      { index: true, element: <Home />, id: "Home" },
      {
        path: "account",
        children: [
          { path: "login", element: <Login /> },
          { path: "signup", element: <SignUp /> },
        ],
      },
      {
        path: "/product",
        children: [
          {
            path: "cookies/:productId",
            element: <Cookies />,
          },
          {
            path: "chocolate/:productId",
            element: <Chocolates />,
          },
          {
            path: "cookies/detail/:productId",
            element: (
              <ProtectedRoute>
                <ProductDetail />
              </ProtectedRoute>
            ),
          },
        ],
      },
      {
        path: "cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "addproduct",
        element: (
          <ProtectedRoute>
            <AddProduct />
          </ProtectedRoute>
        ),
      },
      {
        path: "logout",
        action: Authlogout,
      },
      {
        path: "*",
        element: <ErrorPage />,
        loader: errorLoader, // Custom error loader to trigger status codes
      },
    ],
  },
]);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
