import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./pages/layout.tsx";
import Collections from "./pages/Collections";
import TodoList from "./pages/TodoList.tsx";

const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <Collections />,
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
