import { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Card as CardT } from "../redux/slider/types";
import { Card } from "./ui/Card";
import { useAppDispatch } from "../redux/store";
import { fetchAnimeCards } from "../redux/slider/slice";
import { SliderName } from "../redux/slider/types";

interface SliderFCProps {
    cards: CardT[];
    status: string;
    sliderName: SliderName;
    apiUrl: string;
}

export const SliderFC: React.FC<SliderFCProps> = ({
    cards,
    status,
    sliderName,
    apiUrl,
}) => {
    const [page, setPage] = useState(1);
    const [currentSlide, setCurrentSlide] = useState(0);
    const dispatch = useAppDispatch();

    const groupCards: CardT[][] = [];
    for (let i = 0; i < cards.length; i += 6) {
        groupCards.push(cards.slice(i, i + 6));
    }

    const maxSlides = 5;
    const visibleSlides = groupCards.slice(0, maxSlides);

    const loadMore = () => {
        if (status === "loading") return;

        dispatch(
            fetchAnimeCards({
                apiUrl,
                sliderName,
                page: page + 1,
            })
        );
        setPage(page + 1);
    };

    useEffect(() => {
        if (cards.length === 0 && status !== "loading") {
            loadMore(); 
        }

        if (
            currentSlide === visibleSlides.length - 1 &&
            visibleSlides.length !== maxSlides &&
            status !== "loading" &&
            status !== "error"
        ) {
            loadMore(); 
        }
    }, [currentSlide, visibleSlides.length, status, cards.length]);

    const settings = {
        infinite: false,
        speed: 600,
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: true,
        arrows: true,
        afterChange: (newCurrentSlide: number) => {
            setCurrentSlide(newCurrentSlide);
        },
    };

    return (
        <>
            {status === "error" ? (
                <div>Произошла ошибка</div>
            ) : status === "loading" && cards.length === 0 ? (
                <div>Загрузка слайдера</div>
            ) : (
                <Slider {...settings}>
                    {visibleSlides.map((group, index) => (
                        <div key={index} className="slider__container">
                            {group.map((anime: CardT) => (
                                <Card key={anime.id} anime={anime} />
                            ))}
                        </div>
                    ))}
                </Slider>
            )}
        </>
    );
};
