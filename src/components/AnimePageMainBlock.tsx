import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useAppDispatch } from "../redux/store";
import { useSelector } from "react-redux";
import { animeInfoSelector } from "../redux/animeInfo/selectors";
import { fetchAnimeInfo } from "../redux/animeInfo/slice";

export const AnimePageMainBlock: React.FC = () => {
    const dispatch = useAppDispatch();
    const { animeInfo, status } = useSelector(animeInfoSelector);
    const { code } = useParams();

    const getAnimeInfo = () => {
        dispatch(
            fetchAnimeInfo(
                `title?code=${code}&filter=code,names.ru,type.string,type.episodes,type.length,genres,status.string,posters.original.url,description,season.string,season.year,player.episodes.last`
            )
        );
    };

    useEffect(() => {
        getAnimeInfo();
    }, []);

    return (
        <>
            {status === "error" ? (
                <div>Произошла ошибка</div>
            ) : status === "loading" ? (
                <div>Загрузка</div>
            ) : (
                <section className="container animePage">
                    <div className="mainSection">
                        <img
                            src={
                                "https://anilibria.tv" +
                                animeInfo.posters.original?.url
                            }
                            alt=""
                        />
                        <div className="mainSection__info">
                            <h1>{animeInfo.names.ru}</h1>
                            <div className="mainSection__info__btns">
                                <Link
                                    to={{
                                        pathname: `/player/${animeInfo.code}`,
                                    }}
                                >
                                    <button className="btn btn__with__img white">
                                        <img
                                            className="btn-img"
                                            src="/img/play.svg"
                                            alt=""
                                        />
                                        <p>Смотреть</p>
                                    </button>
                                </Link>

                                <button className="mainSection__info__btns__favorites">
                                    <img src="/img/bookmark.svg" alt="" />
                                </button>
                                <button className="btn mainSection__info__btns__select__list">
                                    Не смотрю
                                </button>
                            </div>
                        </div>
                    </div>
                    <button className="add__to__collection btn__with__img btn white">
                        <img src="/img/add.svg" alt="" />
                        <p>Добавить в коллекцию</p>
                    </button>
                    <section className="section__info">
                        <section className="section__info__about">
                            <h2>Об аниме</h2>
                            <table>
                                <tbody>
                                    <tr>
                                        <td className="attribute">Тип</td>
                                        <td className="value">
                                            {animeInfo.type.string == "MOVIE"
                                                ? "Фильм"
                                                : "ТВ Сериал"}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="attribute">Эпизоды</td>
                                        <td className="value">
                                            {animeInfo.type.episodes === null
                                                ? "-"
                                                : animeInfo.player.episodes
                                                      ?.last +
                                                  " / " +
                                                  (animeInfo.type.episodes ===
                                                  null
                                                      ? " ? "
                                                      : animeInfo.type
                                                            .episodes)}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="attribute">Жанры</td>
                                        <td className="value">
                                            {animeInfo.genres.join(", ")}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="attribute">Статус</td>
                                        <td className="value">
                                            {animeInfo.status.string ==
                                            "В работе"
                                                ? "Выходит"
                                                : animeInfo.status.string}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="attribute">
                                            Сезон & год
                                        </td>
                                        <td className="value">
                                            {animeInfo.season.string &&
                                                animeInfo.season.string.replace(
                                                    animeInfo.season.string[0],
                                                    animeInfo.season.string[0].toUpperCase()
                                                ) + " "}
                                            {animeInfo.season.year}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="attribute">
                                            Длительность
                                        </td>
                                        <td className="value">
                                            {animeInfo.type === null ||
                                            animeInfo.type.string === null ||
                                            animeInfo.type.length === null
                                                ? "-"
                                                : animeInfo.type.string ===
                                                  "MOVIE"
                                                ? animeInfo.type.length &&
                                                  Math.floor(
                                                      animeInfo.type.length / 60
                                                  ) +
                                                      " ч. " +
                                                      (animeInfo.type.length %
                                                          60) +
                                                      " мин."
                                                : animeInfo.type.length +
                                                  " мин. ~ серия"}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </section>
                        <section className="section__info__description">
                            <h2>Описание</h2>
                            <p>{animeInfo.description}</p>
                        </section>
                    </section>
                </section>
            )}
        </>
    );
};
