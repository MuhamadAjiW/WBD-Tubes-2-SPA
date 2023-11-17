export interface IBookP {
    bookp_id: number;
    title: string;
    genre: string;
    synopsis: string;
    release_date: Date;
    word_count: number;
    duration: number;
    graphic_cntn: boolean;
    image_path: string;
    audio_path: string;
    author_id: number;
}