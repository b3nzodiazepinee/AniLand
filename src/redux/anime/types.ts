import { StatusLoading } from "../globalTypes";

export interface AnimeSliceState {
    items: Anime[];
    status: StatusLoading;
}

export type fetchAnimeArgs = {
    apiUrl: string;
};

export interface Anime {
    id: number;
    code?: string;
    names?: Names;
    announce?: string;
    status?: Status;
    posters?: Posters;
    genres?: Genre[];
    type?: Type;
    season?: Season;
    description?: string;
    in_favorites?: number;
    player?: Player;
}

type Type = {
    full_string?: string;
    string?: string;
    episodes?: string | null;
    length?: number;
};

export type Names = {
    ru?: string;
    en?: string;
    alternative?: string | null;
};

export interface Posters {
    small?: PosterImage;
    medium?: PosterImage;
    original: PosterImage;
}

type PosterImage = {
    url: string;
};

export type Genre = string;

type Status = {
    string?: string;
    code?: number;
};

export type Season = {
    string?: string;
    code?: number;
    year?: number;
    week_day?: number;
};

type HLSLinks = {
    fhd: string;
    hd: string;
    sd: string;
};

interface Episode {
    episode: number;
    name: string | null;
    preview: string | null;
    hls: HLSLinks;
}

interface EpisodeList {
    [key: string]: Episode;
}

type EpisodesInfo = {
    first: number;
    last: number;
    string: string;
};

type Player = {
    host: string;
    episodes: EpisodesInfo;
    list: EpisodeList;
};
