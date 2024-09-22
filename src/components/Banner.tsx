import { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../redux/store";
import { Link } from "react-router-dom";
import { fetchBanner } from "../redux/slices/bannerSlice";

const Banner: React.FC = () => {
    const dispatch = useAppDispatch();
    const [sound, setSound] = useState(false);

    const { item, status } = useSelector(
        (state: RootState) => state.bannerSlice
    );

    const getAnime = async () => {
        dispatch(fetchBanner("title?id=9601&filter=names.ru,description"));
    };

    useEffect(() => {
        getAnime();
    }, []);

    const toggleSound = useCallback(() => {
        setSound((prevSound) => !prevSound);
    }, []);

    return (
        <>
            {status === "error" ? (
                <div>Произошла ошибка</div>
            ) : status === "loading" ? (
                <div>Загрузка Баннера</div>
            ) : (
                <section className="banner">
                    <div className="banner__shadow">
                        {/* <div className="banner__shadow__left" />
                        <div className="banner__shadow__right" /> */}
                        <div className="banner__shadow__bottom" />
                    </div>
                    <div className="header__shadow" />
                    <video autoPlay playsInline loop muted={!sound}>
                        <source type="video/mp4" src="/video/opening.mp4" />
                    </video>
                    <div className="banner__content">
                        <div>
                            <h2>{item.names.ru}</h2>
                            <p>
                                {item.description &&
                                item.description.length > 250
                                    ? item.description.slice(0, 250) + "..."
                                    : item.description}
                            </p>
                            <Link to="/">
                                <button className="btn white btn-img">
                                    <img src="./img/play.svg" alt="Play" />
                                    <span>Смотреть</span>
                                </button>
                            </Link>
                        </div>
                        <button onClick={() => toggleSound()}>
                            {!sound ? (
                                <img src=".\img\sound-mute.svg" alt="Unmute" />
                            ) : (
                                <img src=".\img\sound-max.svg" alt="Mute" />
                            )}
                        </button>
                    </div>
                </section>
            )}
        </>
    );
};

export default Banner;
