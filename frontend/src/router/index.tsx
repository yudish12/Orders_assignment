import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Auth from "../Pages/Auth";
import Products from "../Pages/Products";
import ProtectedRoute from "./ProtectedRoute";
import Edit from "../Pages/Edit";
import Create from "../Pages/Create";

export default function RouterWrapper() {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <Auth />
        },
        {
            path: '/products',
            element: (
                <ProtectedRoute>
                    <Products />
                </ProtectedRoute>
            )
        },
        {
            path: '/edit/:id',
            element: (
                <ProtectedRoute>
                    <Edit />
                </ProtectedRoute>
            )
        },
        {
            path: '/create',
            element: (
                <ProtectedRoute>
                    <Create/>
                </ProtectedRoute>
            )
        }
    ])

    return <RouterProvider router={router} />
}

