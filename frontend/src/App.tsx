import React from 'react';
import './App.css';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import ResetPassword from "./Pages/Auth/ResetPassword/ResetPassword";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import Login from "./Pages/Auth/Login/Login";
import Register from "./Pages/Auth/Register/Register";
import ForgotPassword from "./Pages/Auth/ForgotPassword/ForgotPassword";
import {SnackbarProvider} from "notistack";

const router = createBrowserRouter([
    {
        path: "/auth/login",
        element: <Login/>,
    },
    {
        path: "/auth/register",
        element: <Register/>,
    },
    {
        path: "/auth/password/forgot",
        element: <ForgotPassword/>,
    },
    {
        path: "/auth/password/reset/:resetId",
        element: <ResetPassword/>,
    },
]);
const lightTheme = createTheme({
    palette: {
        mode: 'light',
    },
});
const App = () => {
    return (
        <ThemeProvider theme={lightTheme}>
            <SnackbarProvider>
                <RouterProvider router={router}/>
            </SnackbarProvider>
        </ThemeProvider>
    )
}

export default App;
