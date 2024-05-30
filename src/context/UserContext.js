import {
    createContext,
    useContext,
    useEffect,
    useReducer,
    useState,
} from "react";
import {useCookies} from "react-cookie";

export const UserContext = createContext();

export const useUser = () => useContext(UserContext);

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

export const UserProvider = ({children}) => {
    // const [sa``, setUserState] = useState({});
    const [state, dispatch] = useReducer(reducer, initialState);
    const [cookie, setCookie, removeCookie] = useCookies(["user"]);
    const [appIsReady, setAppIsReady] = useState(false);

    const studentSignIn = async (mat_no, password) => {
        console.log(mat_no, password);
        return fetch("/api/login/student", {
            method: "POST",
            body: JSON.stringify({mat_no: mat_no, password: password}),
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        })
            .then(async (res) => {
                // console.log(res);

                if (!res.ok) throw new Error(JSON.stringify(await res.json()));
                return res.json();
            })
            .then((data) => {
                dispatch({type: actionTypes.SIGN_IN, payload: data});

                // console.log(data);
            });
    };

    const studentRegister = async (data) => {
        console.log(data);
        return fetch("/api/register/student", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        })
            .then(async (res) => {
                // console.log(res);
                if (!res.ok) throw new Error(JSON.stringify(await res.json()));

                return res.json();
            })
            .then((data) => {
                dispatch({type: actionTypes.SIGN_IN, payload: data});

                // console.log(data);
            });
    };

    const lecturerRegister = async (data) => {
        console.log(data);
        return fetch("/api/register/lecturer", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        })
            .then(async (res) => {
                // console.log(res);
                if (!res.ok) throw new Error(JSON.stringify(await res.json()));

                return res.json();
            })
            .then((data) => {
                dispatch({type: actionTypes.SIGN_IN, payload: data});

                // console.log(data);
            });
    };

    const lecturerSignIn = async (staffId, password) => {
        return fetch("/api/login/lecturer", {
            method: "POST",
            body: JSON.stringify({staff_id: staffId, password: password}),
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        })
            .then(async (res) => {
                // console.log(res);
                if (!res.ok) throw new Error(JSON.stringify(await res.json()));

                return res.json();
            })
            .then((data) => {
                dispatch({type: actionTypes.SIGN_IN, payload: data});
                return data;
                // console.log(data);
            });
    };

    const signUp = () => {};

    const signOut = async () => {
        return fetch("/api/logout", {
            method: "GET",
            credentials: "include",
        })
            .then((res) => {
                // console.log(res);
                if (!res.ok) throw new Error();
                console.log("logged out");
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
        removeCookie("user", {
            secure: false,
            maxAge: 3.1536e10,
        });
    };

    const getStudentProfile = async () => {
        return fetch(`/api/student/get_details`, {
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
            });
    };

    const getLecturerProfile = async () => {
        return fetch(`/api/lecturer/get_details`, {
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

    const getResult = async () => {};

    useEffect(() => {
        console.log("sign back in", state, cookie);
        dispatch({type: actionTypes.SIGN_IN, payload: cookie["user"]});
        setAppIsReady(true);
    }, []);

    return (
        <UserContext.Provider
            value={{
                state,
                appIsReady,
                studentSignIn,
                lecturerSignIn,
                signOut,
                getStudentProfile,
                getLecturerProfile,
                signUp,
                signOut,
                sessionSignOut,
                studentRegister,
                lecturerRegister,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};
