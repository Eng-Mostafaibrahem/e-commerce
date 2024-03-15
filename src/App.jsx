import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Register from "./Components/Register/Register";
import LayOut from "./Components/LayOut/LayOut";
import Login from "./Components/Login/Login";
import Home from "./Components/Home/Home";
import NotFound from "./Components/NotFound/NotFound";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import Products from "./Components/Products/Products";
import Cart from "./Components/Cart/Cart";
import Categories from "./Components/Categories/Categories";
import { TokenContext } from "./CONTEXT/TokenContext";
import { useContext, useEffect } from "react";
import ProtectedRoutes from "./Components/ProtectedRoutes/ProtectedRoutes";
import CategoryDetails from "./Components/CategoryDetails/CategoryDetails";
import { Toaster } from "react-hot-toast";
import WishList from "./Components/WishList/WishList";

function App() {
  let { setToken } = useContext(TokenContext);

  const routes = createBrowserRouter([
    {
      path: "",
      element: <LayOut />,
      children: [
        { path: "register", element: <Register /> },
        { path: "login", element: <Login /> },
        {
          index: true,
          element: (
            <ProtectedRoutes>
              {" "}
              <Home />{" "}
            </ProtectedRoutes>
          ),
        },
        {
          path: "products",
          element: (
            <ProtectedRoutes>
              <Products />{" "}
            </ProtectedRoutes>
          ),
        },
        {
          path: "productdetails/:id",
          element: (
            <ProtectedRoutes>
              <ProductDetails />{" "}
            </ProtectedRoutes>
          ),
        },
        {
          path: "cart",
          element: (
            <ProtectedRoutes>
              <Cart />{" "}
            </ProtectedRoutes>
          ),
        },
        {
          path: "categories",
          element: (
            <ProtectedRoutes>
              <Categories />
            </ProtectedRoutes>
          ),
        },
        {
          path: "categorydetails/:id",
          element: (
            <ProtectedRoutes>
              <CategoryDetails />{" "}
            </ProtectedRoutes>
          ),
        },
        {
          path: "wishlist",
          element: (
            <ProtectedRoutes>
              <WishList />
            </ProtectedRoutes>
          ),
        },
        {
          path: "*",
          element: (
            <ProtectedRoutes>
              <NotFound />
            </ProtectedRoutes>
          ),
        },
      ],
    },
  ]);

  useEffect(() => {
    if (localStorage.getItem("Token") != null) {
      setToken(localStorage.getItem("Token"));
    }
  }, []);

  return (
    <>
      <RouterProvider router={routes}></RouterProvider>
      <Toaster />

    </>
    
  );
}

export default App;
