import { useState } from "react";

export const RegForm: React.FC = () => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(true);

    const PasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    return (
        <div className="modal__content">
            <h2>Создать аккаунт</h2>
            <form className="modal__content__form" method="post">
                <div>
                    <label htmlFor="userName">Имя пользователя</label>
                    <input
                        placeholder="Введите имя"
                        id="userName"
                        type="text"
                        autoFocus
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Пароль</label>
                    <div className="password__line">
                        <input
                            placeholder="Введите пароль"
                            id="password"
                            type={isPasswordVisible ? "password" : "text"}
                            required
                        />
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                PasswordVisibility();
                            }}
                            className={`${
                                isPasswordVisible ? "open" : "close"
                            }`}
                        />
                    </div>
                </div>
                <div>
                    <label htmlFor="email">Эл. Почта</label>
                    <input
                        placeholder="your.email@adress.com"
                        id="email"
                        type="email"
                        required
                    />
                </div>
                <button type="submit" className="form_btn">
                    Зарегистрироваться
                </button>
            </form>
            <div className="modal__content__info">
                Регистрируясь, вы соглашаетесь с{" "}
                <span>Условным соглашением</span> и{" "}
                <span>политикой конфиденциальности</span>
            </div>
        </div>
    );
};
