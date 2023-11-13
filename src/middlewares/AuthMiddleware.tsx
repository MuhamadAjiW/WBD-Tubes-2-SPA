import React from "react";
import { useCookies } from "react-cookie"
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
    element: JSX.Element;
}

export const RequireAuth: React.FC<PrivateRouteProps> = ({ element }) => {
    const [cookies] = useCookies(['token']);
    const isAuth = cookies.token !== undefined;

    return isAuth? element : <Navigate to="/login"/>
};

export const RequireNoAuth: React.FC<PrivateRouteProps> = ({ element }) => {
    const [cookies] = useCookies(['token']);
    const isNotAuth = cookies.token === undefined;

    return isNotAuth? element : <Navigate to="/home"/>
};