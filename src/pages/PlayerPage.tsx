import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Player, PlayerMenu } from "../components";
import { fetchPlayer } from "../redux/player/slice";
import { useAppDispatch } from "../redux/store";
import { playerSelector } from "../redux/player/selectors";

const PlayerPage = () => {
    const dispatch = useAppDispatch();
    const { code } = useParams();

    const { player, names, status, currentEpisode, selectedQuality } =
        useSelector(playerSelector);

    const episodes = Object.values(player.list);

    const getPlayerInfo = async () => {
        dispatch(
            fetchPlayer(
                `title?code=${code}&filter=names.ru,player.host,player.list`
            )
        );
    };

    useEffect(() => {
        getPlayerInfo();
    }, []);

    return (
        <>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    paddingTop: "70px",
                }}
                className="container"
            >
                <Player
                    player={player}
                    names={names || { ru: "" }}
                    status={status}
                    selectedQuality={selectedQuality}
                    currentEpisode={currentEpisode}
                />
                <PlayerMenu episodes={episodes} status={status} />
            </div>
        </>
    );
};

export default PlayerPage;
