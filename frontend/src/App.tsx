import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import ResetPassword from "./Pages/Auth/ResetPassword/ResetPassword";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Login from "./Pages/Auth/Login/Login";
import Register from "./Pages/Auth/Register/Register";
import ForgotPassword from "./Pages/Auth/ForgotPassword/ForgotPassword";
import { SnackbarProvider } from "notistack";
import Layout from "./Layout/Layout";
import Main from "./Pages/Main/Main";
import Chat from "./Pages/Chat/Chat";
import { ConfirmProvider } from "material-ui-confirm";
import Letter from "./Pages/Letter/Letter";
import Search from './Pages/Search/Search';
import ErrorElement from './Pages/ErrorElement/ErrorElement';
import Settings from './Pages/Settings/Settings';
import About from './Pages/About/About';

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout children={<Main />} />
    },
    {
        path: "/auth/login",
        element: <Login />,
    },
    {
        path: "/auth/register",
        element: <Register />,
    },
    {
        path: "/auth/password/forgot",
        element: <ForgotPassword />,
    },
    {
        path: "/auth/password/reset/:resetId",
        element: <ResetPassword />,
    },
    {
        path: "/chat",
        element: <Layout children={<Chat noConversation={true} />} />
    },
    {
        path: "/chat/:receiverId",
        element: <Layout children={<Chat noConversation={false} />} />
    },
    {
        path: '/letter/:letterId',
        element: <Layout children={<Chat children={<Letter />} noConversation={true} />} />
    },
    {
        path: "/search",
        element: <Layout children={<Search />} />
    },
    {
        path: "/settings",
        element: <Layout children={<Settings />} />
    },
    {
        path: "/about",
        element: <Layout children={<About />} />
    },
    {
        path: "*",
        element: <Layout children={<ErrorElement message="404 not found" />} />
    }
]);
const lightTheme = createTheme({
    palette: {
        mode: 'light',
    },
});
const App = () => {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <ThemeProvider theme={lightTheme}>
                <SnackbarProvider>
                    <ConfirmProvider>
                        <RouterProvider router={router} />
                    </ConfirmProvider>
                </SnackbarProvider>
            </ThemeProvider>
        </LocalizationProvider>
    );
};

export default App;
