export enum StatusLoading {
    LOADING = "loading",
    SUCCESS = "success",
    ERROR = "error",
}

export type Names = {
    ru?: string;
    en?: string;
    alternative?: string | null;
};

export type Type = {
    full_string?: string;
    string?: string;
    episodes?: number | null;
    length?: number;
};

export interface Posters {
    small?: PosterImage;
    medium?: PosterImage;
    original?: PosterImage;
}

type PosterImage = {
    url: string;
};

export type Genre = string;

export type Status = {
    string?: string;
    code?: number;
};

export type Season = {
    string?: string;
    code?: number;
    year?: number;
    week_day?: number;
};
