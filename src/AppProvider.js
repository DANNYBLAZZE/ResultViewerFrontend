import React from "react";
import {UserProvider} from "./context/UserContext";
import { CookiesProvider } from 'react-cookie'

export default function AppProvider({children}) {
    return (
        <CookiesProvider>
            <UserProvider>{children}</UserProvider>
        </CookiesProvider>
    );
}
