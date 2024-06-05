import React from "react";
import {UserProvider} from "./context/UserContext";
import {CookiesProvider} from "react-cookie";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function AppProvider({children}) {
    return (
        <QueryClientProvider client={queryClient}>
            <CookiesProvider>
                <UserProvider>{children}</UserProvider>
            </CookiesProvider>
            <ReactQueryDevtools initialIsOpen={true}/>
        </QueryClientProvider>
    );
}
