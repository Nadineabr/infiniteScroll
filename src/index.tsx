import * as ReactDOM from "react-dom";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Loader } from "./components/Loader";
import { Post } from "./components/Post";
import { Posts } from "./components/Posts";

const router = createBrowserRouter([
  {
    path: "*",
    element: <Posts />,
    loader: Loader,
  },
  {
    path: "posts/:id",
    element: <Post />,
    loader: Loader,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />,
);
