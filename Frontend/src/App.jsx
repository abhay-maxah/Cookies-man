import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./pages/Root";
import ErrorPage from "./pages/Error";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Cookies from "./pages/Cookies";
import Chocolates from "./pages/Chocolates";
import { tokenLoader } from "./util/auth";
import { action as Authlogout } from "./pages/Logout";
import Cart from "./pages/Cart";
import AddProduct from "./components/AddProduct";
import ProductDetail from "./components/ProductDetail";
import { AuthProvider } from "./util/AuthContext";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    id: "root",
    loader: tokenLoader,
    children: [
      { index: true, element: <Home />,id:"Home", loader: tokenLoader },
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
            loader: tokenLoader
          },
          { path: "chocolate/:productId", element: <Chocolates />, loader: tokenLoader },
          { path: "cookies/detail/:productId", element: <ProductDetail /> },
        ],
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "addproduct",
        element: <AddProduct />,
      },
      {
        path: "logout",
        action: Authlogout,
      },
      { path: "*", element: <ErrorPage /> },
    ],
  },
]);
function App() {
  return (<AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>)
}
export default App;
