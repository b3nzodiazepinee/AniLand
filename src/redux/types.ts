export enum StatusLoading {
    LOADING = "loading",
    SUCCESS = "success",
    ERROR = "error",
}
//animeSlice

export interface AnimeSliceState {
    items: Anime[];
    status: StatusLoading;
}

export type fetchAnimeArgs = {
    apiUrl: string;
};

export interface Anime {
    id: number;
    code: string;
    names: Names;
    announce: string;
    status: Status;
    posters: Posters;
    genres: Genre[];
    type: Type;
    season: Season;
    description: string;
    in_favorites: number;
    player: Player;
}

type Type = {
    full_string: string;
    string: string;
    episodes: string | null;
    length: number;
}

type Names = {
    ru: string;
    en: string;
    alternative: string | null;
}

interface Posters {
    small: PosterImage;
    medium: PosterImage;
    original: PosterImage;
}

type PosterImage = {
    url: string;
};

type Genre = string;

type Status = {
    string: string;
    code: number;
};

type Season = {
    string: string;
    code: number;
    year: number;
    week_day: number;
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

//bannerSlice

export interface BannerSliceState {
    item: Banner;
    status: StatusLoading;
}

export type Banner = {
    id: number;
    names: Names;
    description: string;
};
