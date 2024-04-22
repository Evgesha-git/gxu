import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Table from "./components/Table";
import Form from "./components/Form";
import "./App.css";

const baseRouter = createBrowserRouter([
    {
        path: "/",
        element: <Table />,
    },
    {
        path: "/add_data",
        element: <Form />,
    },
    {
        path: "/add_data/:id",
        element: <Form />,
    },
]);

function App() {
    return (
        <div className="container">
            <RouterProvider router={baseRouter} />
        </div>
    );
}

export default App;
