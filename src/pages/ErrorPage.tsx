import { Link } from "react-router-dom";

const ErrorPage: React.FC = () => {
    return (
        <div className="container">
            <div className="errorPage">
                <h1>404</h1>
                <h2>К сожалению, нам не удалось найти эту страницу</h2>
                <Link to="/">
                    <button>Вернуться на главную</button>
                </Link>
            </div>
        </div>
    );
};

export default ErrorPage;
