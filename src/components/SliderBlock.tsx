import { useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchAnimeCards } from "../redux/slider/slice";
import { useAppDispatch } from "../redux/store";
import { sliderSelector } from "../redux/slider/selectors";
import { SliderFC } from "./Slider";

export const SliderBlock: React.FC = () => {
    const dispatch = useAppDispatch();
    const sliderCards = useSelector(sliderSelector);

    const getCards = () => {
        dispatch(
            fetchAnimeCards({
                apiUrl: `title/search/advanced?simple_query=season.year==2024&filter=id,code,posters.original,names.ru,season.year,genres[0]&order_by=changed&sort_direction=1&limit=36`,
                sliderName: "newAnimeCards",
            })
        );

        dispatch(
            fetchAnimeCards({
                apiUrl: `title/search/advanced?simple_query=season.year==2024&filter=id,code,posters.original,names.ru,season.year,genres[0]&order_by=updated&sort_direction=1&limit=36`,
                sliderName: "newSeriesCards",
            })
        );

        dispatch(
            fetchAnimeCards({
                apiUrl: `title/search/advanced?simple_query=status.code==2&filter=id,code,posters.original,names.ru,season.year,genres[0]&order_by=torrents.list.downloads&sort_direction=1&limit=36`,
                sliderName: "popularAnimeCards",
            })
        );

        dispatch(
            fetchAnimeCards({
                apiUrl: `title/search/advanced?simple_query=status.code==2&filter=id,code,posters.original,names.ru,season.year,genres[0]&order_by=in_favorites&sort_direction=1&limit=36`,
                sliderName: "bestRatingCards",
            })
        );

        dispatch(
            fetchAnimeCards({
                apiUrl: `title/search/advanced?simple_query=type.string==MOVIE&filter=id,code,posters.original,names.ru,season.year,genres[0]&order_by=in_favorites&sort_direction=1&limit=36`,
                sliderName: "moviesCards",
            })
        );
    };

    useEffect(() => {
        getCards();
    }, []);

    return (
        <div>
            <div className="container">
                <div className="slider__block">
                    <h2>Новые аниме</h2>
                    <SliderFC
                        cards={sliderCards.newAnimeCards}
                        status={sliderCards.status.newAnimeCards}
                    />
                </div>
                <div className="slider__block">
                    <h2>Новые серии</h2>
                    <SliderFC
                        cards={sliderCards.newSeriesCards}
                        status={sliderCards.status.newSeriesCards}
                    />
                </div>
                <div className="slider__block">
                    <h2>Популярное</h2>
                    <SliderFC
                        cards={sliderCards.popularAnimeCards}
                        status={sliderCards.status.popularAnimeCards}
                    />
                </div>
                <div className="slider__block">
                    <h2>Лучший рейтинг</h2>
                    <SliderFC
                        cards={sliderCards.bestRatingCards}
                        status={sliderCards.status.bestRatingCards}
                    />
                </div>
                <div className="slider__block">
                    <h2>Фильмы</h2>
                    <SliderFC
                        cards={sliderCards.moviesCards}
                        status={sliderCards.status.moviesCards}
                    />
                </div>
            </div>
        </div>
    );
};
