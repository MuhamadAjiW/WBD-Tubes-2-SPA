import { IBookP } from "./IBookP";

export interface IPlaylistBook {
    bookp_id: number;
    playlist_id: number;
    bookp: IBookP;
}