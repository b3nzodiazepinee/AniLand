import { Link } from "react-router-dom";
import { Card as CardT } from "../redux/Slider/types";

interface CardProps {
    anime: CardT;
}

export const Card: React.FC<CardProps> = ({ anime }: { anime: CardT }) => {
    return (
        <div className="card">
            <Link
                to={{
                    pathname: `/anime/${anime.code}`,
                }}
            >
                <img
                    src={"https://anilibria.tv" + anime.posters.original.url}
                />
                <div className="card__content">
                    <h2>
                        {anime.names.ru && anime.names.ru.length > 40
                            ? anime.names.ru.slice(0, 40) + "..."
                            : anime.names.ru}
                    </h2>
                    <p>
                        {anime.season.year} • {anime.genres}
                    </p>
                </div>
                <div className="card__blackout"></div>
            </Link>
        </div>
    );
};
