import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import MainPage from "../pages/MainPage";

const ErrorPage = lazy(() => import("../pages/ErrorPage"));
const AnimePage = lazy(() => import("../pages/AnimePage"));
const PlayerPage = lazy(() => import("../pages/PlayerPage"));

const AppRoutes: React.FC = () => {
    return (
        <Suspense fallback={<div>Загрузка страницы</div>}>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/anime/:code" element={<AnimePage />} />
                <Route path="/player/:code" element={<PlayerPage />} />
                <Route path="*" element={<ErrorPage />} />
            </Routes>
        </Suspense>
    );
};

export default AppRoutes;
