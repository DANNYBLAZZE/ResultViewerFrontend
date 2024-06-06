import React from "react";
import {CookiesProvider} from "react-cookie";
import {SessionProvider} from "./context/SessionContext";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function AppProvider({children}) {
    return (
        <QueryClientProvider client={queryClient}>
            <CookiesProvider>
                <SessionProvider>{children}</SessionProvider>
            </CookiesProvider>
            <ReactQueryDevtools initialIsOpen={true} />
        </QueryClientProvider>
    );
}
