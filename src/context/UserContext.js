import {createContext, useContext} from "react";
import {json} from "react-router-dom";

export const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({children}) => {
    const signIn = async (mat_no, password) => {
        console.log(mat_no, password);
        return fetch("http://localhost:5000/login", {
            method: "POST",
            body: JSON.stringify({mat_no: mat_no, password: password}),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => {
                console.log(res);
                if (!res.ok) 
                    throw new Error();
                return res.text();
            })
            .then((data) => {
                console.log("yeah", data);
                return true;
            })
            .catch((error) => {
                console.log(error);
                return false;
            });
    };

    const signUp = () => {};

    const signOut = () => {};

    return (
        <UserContext.Provider value={{signIn, signUp, signOut}}>
            {children}
        </UserContext.Provider>
    );
};
