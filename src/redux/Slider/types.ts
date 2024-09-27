import { Genre, Names, Posters, Season } from "../anime/types";
import { StatusLoading } from "../globalTypes";

export interface CardSliceState {
    newAnimeCards: Card[];
    newSeriesCards: Card[];
    popularAnimeCards: Card[];
    bestRatingCards: Card[];
    moviesCards: Card[];
    status: {
        newAnimeCards: StatusLoading;
        newSeriesCards: StatusLoading;
        popularAnimeCards: StatusLoading;
        bestRatingCards: StatusLoading;
        moviesCards: StatusLoading;
    };
}

export interface Card {
    id: number;
    code: string;
    posters: Posters;
    names: Names;
    season: Season;
    genres: Genre[];
}

export type SliderName = 
  | "newAnimeCards" 
  | "newSeriesCards" 
  | "popularAnimeCards" 
  | "bestRatingCards" 
  | "moviesCards";
