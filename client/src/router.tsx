import { createBrowserRouter, type RouteObject } from "react-router-dom";
import App from "./App";
import { HomePage } from "./pages/home-page/home-page";
import { TaskPage } from "./pages/task-page/task-page";


const routes: RouteObject[] = [
    {
        path: "/",
        element: <App />,
        children: [
            {
                index: true,
                element: <HomePage />
            },
            {
                path: "/task/:id",
                element: <TaskPage />
            }
        ]
    },
];


export const router = createBrowserRouter(routes);
