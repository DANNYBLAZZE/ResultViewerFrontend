import {createContext, useContext, useReducer, useState} from "react";

export const UserContext = createContext();

export const useUser = () => useContext(UserContext);

const initialState = {
    user: null,
    results: []
};

const actionTypes = {
    SIGN_IN: "SIGN_IN",
    SIGN_UP: "SIGN_UP",
    SIGN_OUT: "SIGN_OUT",
};

const reducer = (state, action) => {
    switch (action.type) {
        case actionTypes.SIGN_IN:
            return {
                ...state,
                user: action.payload,
                isSignedIn: true,
            };
        case actionTypes.SIGN_UP:
            return {
                ...state,
                user: action.payload,
            };
        case actionTypes.SIGN_OUT:
            return initialState;
        default:
            return initialState;
    }
};


export const UserProvider = ({children}) => {
    // const [sa``, setUserState] = useState({});
    const [state, dispatch] = useReducer(reducer, initialState);

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
                // console.log(res);
                if (!res.ok) throw new Error();
                return res.json();
            })
            .then((data) => {
                dispatch({type: actionTypes.SIGN_IN, payload: data.id});

                // console.log(data);
            })
        
    };

    const signUp = () => {};

    const signOut = () => {};

    const getUserData = async () => {
        return fetch(`/api/get_details`, {
            method: "GET",
            credentials: "include",
        })
            .then((res) => {
                if (!res.ok) throw new Error();
                return res.json();
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

    const getResult = async () => {

    }

    return (
        <UserContext.Provider
            value={{state, signIn, getUserData, signUp, signOut}}
        >
            {children}
        </UserContext.Provider>
    );
};
