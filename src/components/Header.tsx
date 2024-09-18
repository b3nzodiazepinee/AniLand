import { Link, NavLink } from "react-router-dom";
import Search from "./Search";

const Header: React.FC = () => {
    return (
        <header className="header">
            <div className="container">
                <div className="header__row">
                    <div className="header__row__part">
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
                    <div className="header__row__part">
                        <Search />
                        <div className="header__row__part__buttons">
                            <button className="btn white">Войти</button>
                            <button className="btn black">Регистрация</button>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
