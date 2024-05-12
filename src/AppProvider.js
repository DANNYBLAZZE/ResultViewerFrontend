import React from "react";
import {UserProvider} from "./context/UserContext";

export default function AppProvider({children}) {
    return <UserProvider>{children}</UserProvider>;
}
