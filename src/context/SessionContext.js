import {
    createContext,
    useContext,
    useEffect,
    useReducer,
    useState,
} from "react";
import {useQuery} from "@tanstack/react-query";
import {useCookies} from "react-cookie";
import axios from "axios";
import instance from "../utils/instance";
import { responsiveFontSizes } from "@mui/material";
import SessionExpired from "../components/SessionExpired";


export const SessionContext = createContext();

export const useSession = () => useContext(SessionContext);

const initialState = {
    user: null,
    results: [],
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

export const SessionProvider = ({children}) => {
    // const [sa``, setUserState] = useState({});
    const [state, dispatch] = useReducer(reducer, initialState);
    const [cookie, setCookie, removeCookie] = useCookies(["user"]);
    const [appIsReady, setAppIsReady] = useState(false);
    const [sessionExpired, setSessionExpired] = useState(false);

    const studentSignIn = async (mat_no, password) => {
        return axios
            .post(
                "/api/login/student",
                {mat_no: mat_no, password: password},
                {credentials: "include"}
            )
            .then((data) => {
                dispatch({type: actionTypes.SIGN_IN, payload: data});
                return data;
            });
    };

    const studentRegister = async (data) => {
        return axios
            .post("/api/register/student", data, {credentials: "include"})
            .then((data) => {
                dispatch({type: actionTypes.SIGN_IN, payload: data});
            });
    };

    const lecturerRegister = async (data) => {
        return axios
            .post("/api/register/lecturer", data, {credentials: "include"})
            .then((data) => {
                dispatch({type: actionTypes.SIGN_IN, payload: data});
            });
    };

    const lecturerSignIn = async (staffId, password) => {
        return axios
            .post(
                "/api/login/lecturer",
                {staff_id: staffId, password: password},
                {credentials: "include"}
            )
            .then((data) => {
                dispatch({type: actionTypes.SIGN_IN, payload: data});
                return data;
            });
    };

    const signOut = async () => {
        return axios
            .get("/api/logout", {credentials: "include"})
            .then(() => {
                dispatch({type: actionTypes.SIGN_OUT});
                removeCookie("user", {
                    secure: false,
                    maxAge: 3.1536e10,
                });
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const sessionSignOut = async () => {
        dispatch({type: actionTypes.SIGN_OUT});
        setSessionExpired(false);
        removeCookie("user", {
            secure: false,
            maxAge: 3.1536e10,
        });
    };

    useEffect(() => {
        console.log("sign back in", state, cookie);
        dispatch({type: actionTypes.SIGN_IN, payload: cookie["user"]});
        setAppIsReady(true);
    }, []);

    // axios interceptor to check if a user session is active
    useEffect(() => {
        const instanceId = instance.interceptors.response.use(
            (response) => response, 
            (error) => {
                if (error.response.status == 401) {
                    setSessionExpired(true);
                }
                console.log(error);
                return Promise.reject(error);
            }
        )
        return () => instance.interceptors.response.eject(instanceId);
    }, [])

    return (
        <SessionContext.Provider
            value={{
                state,
                appIsReady,
                studentSignIn,
                lecturerSignIn,
                signOut,
                signOut,
                sessionSignOut,
                studentRegister,
                lecturerRegister,
            }}
        >
            {children}
            {sessionExpired && <SessionExpired/>}
        </SessionContext.Provider>
    );
};
