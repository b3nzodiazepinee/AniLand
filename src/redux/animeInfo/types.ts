import { Genre, Names, Posters, Status, Type, Season, EpisodesInfo, Player } from "../anime/types";
import { StatusLoading } from "../globalTypes";

export interface AnimeInfoState {
    animeInfo: AnimeInfo;
    status: StatusLoading;
}

export interface AnimeInfo {
        id: number;
        code: string;
        names: Names;
        type: Type;
        genres: Genre[];
        status: Status;
        posters: Posters;
        description: string;
        season: Season;
        player: Player;
};
