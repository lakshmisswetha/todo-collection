import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./pages/layout.tsx";
import Collections from "./pages/Collections";
import Signup from "./pages/Signup.tsx";
import Login from "./pages/Login.tsx";
import TodoList from "./pages/TodoList.tsx";

const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/collections",
                element: <Collections />,
            },

            {
                path: "/",
                element: <Signup />,
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/todo",
                element: <TodoList />,
            },
        ],
    },
]);

const AppRouter = () => {
    return <RouterProvider router={appRouter} />;
};

export default AppRouter;
