import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./pages";
import Collections from "./pages/Collections";

const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <Dashboard />,
        children: [
            {
                path: "/",
                element: <Collections />,
            },
        ],
    },
]);

const AppRouter = () => {
    return <RouterProvider router={appRouter} />;
};

export default AppRouter;
