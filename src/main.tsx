import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "./redux/store";
import AppRoutes from "./Routes/AppRoutes";
import "./scss/app.scss";

createRoot(document.getElementById("root")!).render(
    <BrowserRouter>
        <Provider store={store}>
            <AppRoutes />
        </Provider>
    </BrowserRouter>
);
