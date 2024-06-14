import { createBrowserRouter } from "react-router-dom";

export const createRouter = () => {
    return createBrowserRouter([
        {
            path: "/",
            lazy: async () => {
                const Home = (await import("./pages/Home")).default;
                return { Component: Home };
            }
        }
    ]);
}