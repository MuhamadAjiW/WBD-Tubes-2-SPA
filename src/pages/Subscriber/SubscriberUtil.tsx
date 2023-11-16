import { REST_API_URL } from "@constants/constants";

export const fetchSubscribers = async(author_id:number, token:string | undefined = undefined): Promise<ServerResponse> => {
    try{
        const response = await fetch(
            `${REST_API_URL}/authors/${author_id}/subscribers`,
            {
                method: "GET",
                headers: {
                "Accept": "application/json",
                ...(token && {"Authorization": `Bearer ${token}`}),
                },
            }
        )

        const result: ServerResponse = await response.json();
        return result;
        
    } catch (error){
        console.error("Subscriber request error:", error);
        throw error;
    }
}

export const fetchPendingSubscribers = async(author_id:number, token:string | undefined = undefined): Promise<ServerResponse> => {
    try{
        const response = await fetch(
            `${REST_API_URL}/authors/${author_id}/subscribers/requests`,
            {
                method: "GET",
                headers: {
                "Accept": "application/json",
                ...(token && {"Authorization": `Bearer ${token}`}),
                },
            }
        )

        const result: ServerResponse = await response.json();
        return result;
        
    } catch (error){
        console.error("Subscriber request error:", error);
        throw error;
    }
}

export const deleteSubscriber = async(user_id:number, author_id:number, token:string | undefined = undefined): Promise<ServerResponse> => {
    try{

        const response = await fetch(
            `${REST_API_URL}/authors/${author_id}/subscribers/requests${user_id}`,
            {
                method: "DELETE",
                headers: {
                "Accept": "application/json",
                ...(token && {"Authorization": `Bearer ${token}`}),
                },
            }
        )

        const result: ServerResponse = await response.json();
        return result;
        
    } catch (error){
        console.error("Subscriber request error:", error);
        throw error;
    }
}

export const updateSubscriber = async(user_id:number, author_id:number, status:string, token:string | undefined = undefined): Promise<ServerResponse> => {
    try{
        const body = {
            author_id,
            user_id,
            status
        };
        const response = await fetch(
            `${REST_API_URL}/authors/${author_id}/subscribers/requests${user_id}`,
            {
                method: "PATCH",
                headers: {
                "Accept": "application/json",
                ...(token && {"Authorization": `Bearer ${token}`}),
                "Content-Type": "application/json",
                },
                body: JSON.stringify(body)
            }
        )

        const result: ServerResponse = await response.json();
        return result;
        
    } catch (error){
        console.error("Subscriber request error:", error);
        throw error;
    }
}