import { Names, StatusLoading } from "../globalTypes";

export interface PlayerSliceState {
    names?: Names;
    player: Player;
    currentEpisode: string;
    selectedQuality: keyof Quality;
    status: StatusLoading;
}

export interface Player {
    host?: string;
    list: { [key: string]: Episode };
    episodes?: Episodes;
}

export interface Quality {
    fhd?: number;
    hd?: number;
    sd?: number;
  }

export interface fetchPlayerPage {
    names?: Names;
    player?: Player;
}

export type Episodes = {
    first?: number;
    last?: number;
    string?: string;
};

export type HLSLinks = {
    fhd: string;
    hd: string;
    sd: string;
};


export interface Episode {
    episode: number;
    name: string;
    uuid: string;
    preview: string | null;
    hls: HLSLinks;
}
