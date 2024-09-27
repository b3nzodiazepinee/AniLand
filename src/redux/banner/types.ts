import { Names } from "../anime/types";
import { StatusLoading } from "../globalTypes";

export interface BannerSliceState {
    item: Banner;
    status: StatusLoading;
}

export type Banner = {
    id: number;
    names: Names;
    description: string;
};
