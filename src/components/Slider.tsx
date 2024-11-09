import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Card } from "./ui/Card";
import { Card as CardT } from "../redux/slider/types";

interface SliderFCProps {
    cards: CardT[];
    status: string;
}

export const SliderFC: React.FC<SliderFCProps> = ({ cards, status }) => {
    const groupCards: CardT[][] = [];
    for (let i = 0; i < cards.length; i += 6) {
        groupCards.push(cards.slice(i, i + 6));
    }

    const settings = {
        infinite: false,
        speed: 600,
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: true,
    };

    return (
        <>
            {status === "error" ? (
                <div>Произошла ошибка</div>
            ) : status === "loading" ? (
                <div>Загрузка слайдера</div>
            ) : (
                <Slider {...settings}>
                    {groupCards.map((group, index) => (
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
