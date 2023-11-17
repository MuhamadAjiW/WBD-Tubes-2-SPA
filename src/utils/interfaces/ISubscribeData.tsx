import { IUser } from "./IUser";

export interface ISubscribeData {
    author_id: string;
    user_id: string;
    status: string;
    user_details: IUser;
}