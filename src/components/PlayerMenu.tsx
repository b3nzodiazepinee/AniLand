import { PlayerEpisode } from "./ui/PlayerEpisode";
import { Episode } from "../redux/player/types";
import { StatusLoading } from "../redux/globalTypes";

interface PlayerMenuProps {
    episodes: Episode[];
    status: StatusLoading;
}

export const PlayerMenu: React.FC<PlayerMenuProps> = ({ episodes, status }) => {
    return (
        <div className="player__menu">
            <h2>Список эпизодов</h2>
            {status === "error" ? (
                <div>Произошла ошибка</div>
            ) : status === "loading" ? (
                <div>Загрузка плеера</div>
            ) : (
                <div className="player__menu__episodes">
                    {episodes.map((episode: Episode) => (
                        <PlayerEpisode key={episode.uuid} episode={episode} />
                    ))}
                </div>
            )}
        </div>
    );
};
