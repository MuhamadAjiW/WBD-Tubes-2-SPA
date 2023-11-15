import { REST_BASE_URL } from "@constants/constants";
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

export const getAccountID = async(token:number | undefined = undefined): Promise<ServerResponse> => {
    try{
        const response = await fetch(
            `${REST_BASE_URL}/token/id`,
            {
                method: "GET",
                headers: {
                "Accept": "application/json",
                ...(token && {"Authorization": `Bearer ${token}`}),
                },
            }
        )

        if (!response.ok) {
            const error = await response.json();
            throw error;
        }
        const result: ServerResponse = await response.json();
        return result;
        
    } catch (error){
        console.error("Subscriber request error:", error);
        throw error;
    }
}
