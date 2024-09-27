import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import MainPage from "../pages/MainPage";

const ErrorPage = lazy(() => import("../pages/ErrorPage"));

const AppRoutes: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<MainPage />} />
            <Route
                path="*"
                element={
                    <Suspense fallback={<div>Загрузка страницы</div>}>
                        <ErrorPage />
                    </Suspense>
                }
            />
        </Routes>
    );
};

export default AppRoutes;
