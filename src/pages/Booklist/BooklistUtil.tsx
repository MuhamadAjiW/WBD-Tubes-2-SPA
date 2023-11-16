import { REST_BASE_URL } from "@constants/constants";

export const fetchBookP = async(author_id:number, token:string | undefined = undefined): Promise<ServerResponse> => {
    try {
        const response = await fetch(
            `${REST_BASE_URL}/authors/${author_id}/books`,
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
    } catch (error) {
        console.error("Book request error:", error);
        throw error;
    }
}