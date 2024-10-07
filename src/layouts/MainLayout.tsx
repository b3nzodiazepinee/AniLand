import { Header } from "../components";
import { Outlet, useLocation } from "react-router-dom";

export const MainLayout: React.FC = () => {
    const location = useLocation();

    return (
        <>
            {location.pathname === "/" && <div className="header__shadow" />}
            <div className="container">
                <Header />
                <Outlet />
            </div>
        </>
    );
};
