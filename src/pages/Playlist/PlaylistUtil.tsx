import { REST_API_URL } from "@constants/constants";

export const fetchPlaylist = async(author_id:number, token:string | undefined = undefined): Promise<ServerResponse> => {
    try {
        const response = await fetch(
            `${REST_API_URL}/authors/${author_id}/playlists`,
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
        console.error("Playlist request error:", error);
        throw error;
    }
}