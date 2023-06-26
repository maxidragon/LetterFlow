import React from 'react';
import './App.css';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import ResetPassword from "./Pages/Auth/ResetPassword/ResetPassword";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import Login from "./Pages/Auth/Login/Login";
import Register from "./Pages/Auth/Register/Register";
import ForgotPassword from "./Pages/Auth/ForgotPassword/ForgotPassword";
import {SnackbarProvider} from "notistack";
import Layout from "./Layout/Layout";
import Main from "./Pages/Main/Main";
import Chat from "./Pages/Chat/Chat";
import {ConfirmProvider} from "material-ui-confirm";
import Letter from "./Pages/Letter/Letter";
import Search from './Pages/Search/Search';

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout children={<Main/>}/>
    },
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
    {
        path: "/chat",
        element: <Layout children={<Chat noConversation={true}/>}/>
    },
    {
        path: "/chat/:receiverId",
        element: <Layout children={<Chat noConversation={false}/>}/>
    },
    {
        path: '/letter/:letterId',
        element: <Layout children={<Chat children={<Letter />} noConversation={true}/>}/>
    },
    {
        path: "/search",
        element: <Layout children={<Search/>}/>
    }
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
                <ConfirmProvider>
                    <RouterProvider router={router}/>
                </ConfirmProvider>
            </SnackbarProvider>
        </ThemeProvider>
    )
}

export default App;
