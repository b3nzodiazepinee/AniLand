import { Link, NavLink } from "react-router-dom";
import { Search } from "./index";
export const Header: React.FC = () => {
    return (
        <header className="header">
            <div className="header__content">
                <div className="header__content__nav">
                    <Link to="/">
                        <h1>AniLand</h1>
                    </Link>
                    <nav>
                        <ul>
                            <li>
                                <NavLink
                                    to="/"
                                    className={({ isActive }) =>
                                        isActive ? "active" : ""
                                    }
                                >
                                    Главная
                                </NavLink>
                            </li>

                            <li>
                                <NavLink
                                    to="/catalog"
                                    className={({ isActive }) =>
                                        isActive ? "active" : ""
                                    }
                                >
                                    Каталог
                                </NavLink>
                            </li>

                            <li>
                                <NavLink
                                    to="/collection"
                                    className={({ isActive }) =>
                                        isActive ? "active" : ""
                                    }
                                >
                                    Коллекции
                                </NavLink>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div className="header__content__nav">
                    <Search />
                    <div className="header__buttons">
                        <button className="btn white">Войти</button>
                        <button className="btn black">Регистрация</button>
                    </div>
                </div>
            </div>
        </header>
    );
};
