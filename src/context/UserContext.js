import {createContext, useContext, useState} from "react";

export const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({children}) => {
    const [userState, setUserState] = useState({});

    const signIn = async (mat_no, password) => {
        console.log(mat_no, password);
        return fetch("/api/login", {
            method: "POST",
            body: JSON.stringify({mat_no: mat_no, password: password}),
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        })
            .then((res) => {
                console.log(res);
                if (!res.ok) throw new Error();
                return res.json();
            })
            .then((data) => {
                setUserState(data);
                console.log(data);
                return true;
            })
            .catch((error) => {
                console.log(error);
                return false;
            });
    };

    const signUp = () => {};

    const signOut = () => {};

    console.log(userState);

    const getUserData = async () => {
        return fetch(`/api/get_details`, {
            method: "GET",
            credentials: "include",
        })
            .then((res) => {
                if (!res.ok) throw new Error();
                return res.JSON();
            })
            .then((data) => {
                console.log(data);
                return data;
            })
            .catch((error) => {
                console.log(error);
                return [];
            });
    };

    return (
        <UserContext.Provider
            value={{userState, signIn, getUserData, signUp, signOut}}
        >
            {children}
        </UserContext.Provider>
    );
};
