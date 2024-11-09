import { Episode } from "../../redux/player/types";
import { useAppDispatch } from "../../redux/store";
import { setEpisode } from "../../redux/player/slice";
import { playerSelector } from "../../redux/player/selectors";
import { useSelector } from "react-redux";

interface PlayerEpisodeProps {
    episode: Episode;
}

export const PlayerEpisode: React.FC<PlayerEpisodeProps> = ({ episode }) => {
    const dispatch = useAppDispatch();
    const { currentEpisode } = useSelector(playerSelector);

    const currentEpisodeNew = String(episode.episode);
    const selectedEpisode = currentEpisode === currentEpisodeNew;

    const changeEpisode = (episode: string) => {
        dispatch(setEpisode(episode));
    };

    return (
        <div
            className={`episode ${selectedEpisode ? "episode__selected" : ""}`}
            onClick={() => changeEpisode(currentEpisodeNew)}
        >
            {episode.preview !== null ? (
                <img
                    className="episode__img"
                    src={"https://anilibria.tv" + episode.preview}
                    alt="Изображение эпизода"
                />
            ) : (
                <div className="episode__img"></div>
            )}
            <span>
                <h2>{"Эпизод " + episode.episode}</h2>
                <h3>{episode.name}</h3>
            </span>
        </div>
    );
};
