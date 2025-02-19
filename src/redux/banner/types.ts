import { Names } from "../globalTypes";
import { StatusLoading } from "../globalTypes";

export interface BannerSliceState {
    item: Banner;
    status: StatusLoading;
}

export interface Banner {
    id: number;
    names: Names;
    description: string;
};
