import { useRef, useEffect, useState } from "react";
import { Player as PlayerI, Quality } from "../redux/player/types";
import { Names, StatusLoading } from "../redux/globalTypes";
import { setQuality } from "../redux/player/slice";
import { useAppDispatch } from "../redux/store";
import Hls from "hls.js";
import Plyr from "plyr";
import "plyr/dist/plyr.css";

interface PlayerProps {
    player: PlayerI;
    names: Names;
    status: StatusLoading;
    currentEpisode: string;
    selectedQuality: keyof Quality;
}

const quality: Record<keyof Quality, number> = {
    fhd: 1080,
    hd: 720,
    sd: 480,
};

const qualityReverse: Record<number, keyof Quality> = {
    1080: "fhd",
    720: "hd",
    480: "sd",
};

export const Player: React.FC<PlayerProps> = ({
    player,
    names,
    status,
    currentEpisode,
    selectedQuality,
}) => {
    const dispatch = useAppDispatch();
    const videoRef = useRef<HTMLVideoElement>(null);
    const hlsRef = useRef<Hls | null>(null);
    const [firstPlay, setFirstPlay] = useState(false);


    
    useEffect(() => {
        if (videoRef.current && status === "success") {
            const hlsUrl = `https://cache.libria.fun${player.list[currentEpisode].hls[selectedQuality]}`;

            const hls = new Hls();
            hlsRef.current = hls;

            hls.loadSource(hlsUrl);
            hls.attachMedia(videoRef.current);

            let playerInstance: Plyr | null = null;

            hls.on(Hls.Events.MANIFEST_PARSED, function () {
                if (videoRef.current) {
                    playerInstance = new Plyr(videoRef.current, {
                        controls: [
                            "play-large",
                            "play",
                            "fast-forward",
                            "current-time",
                            "progress",
                            "duration",
                            "mute",
                            "volume",
                            "settings",
                            "pip",
                            "fullscreen",
                        ],
                        settings: ["speed", "quality"],
                        speed: {
                            selected: 1,
                            options: [0.5, 1, 1.5, 2],
                        },
                        quality: {
                            default: quality[selectedQuality],
                            options: Object.values(quality),
                            onChange: (event) => handleQualityChange(event),
                            forced: true,
                        },
                    });

                    if (firstPlay) {
                        playerInstance.play();
                    }
                }
            });

            if (hlsRef.current) {
                hlsRef.current.loadSource(hlsUrl);
            }
        }
    }, [player, names, currentEpisode, status, selectedQuality, firstPlay]);

    const handleQualityChange = (newQuality: number) => {
        const qualityString: keyof Quality = qualityReverse[newQuality];

        if (qualityString) {
            console.log("Новое качество:", qualityString);

            const newHlsUrl = `https://cache.libria.fun${player.list[currentEpisode].hls[qualityString]}`;

            if (hlsRef.current && videoRef.current) {
                hlsRef.current.loadSource(newHlsUrl);
                hlsRef.current.attachMedia(videoRef.current);

                if (firstPlay) {
                    videoRef.current.play();
                }
            }

            dispatch(setQuality(qualityString));
        } else {
            console.error("Неверное качество:", newQuality);
        }
    };

    const handleFirstPlay = () => {
        if (!firstPlay) {
            setFirstPlay(true);
        }
    };

    return (
        <>
            {status === "error" ? (
                <div>Произошла ошибка</div>
            ) : status === "loading" ? (
                <div>Загрузка плеера</div>
            ) : (
                <div className="player__section">
                    <h1>{names.ru}</h1>
                    <video
                        className="player"
                        id="player"
                        ref={videoRef}
                        preload="metadata"
                        controls
                        poster={
                            player.list[currentEpisode].preview
                                ? `https://anilibria.tv${player.list[currentEpisode].preview}`
                                : undefined
                        }
                        onPlay={handleFirstPlay}
                    />
                </div>
            )}
        </>
    );
};
