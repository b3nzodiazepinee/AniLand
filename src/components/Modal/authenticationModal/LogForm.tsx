import { useState } from "react";

type LogFormProps = {
    isOpen: () => void;
    onClose: () => void;
};

export const LogForm: React.FC<LogFormProps> = ({ isOpen, onClose }) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(true);

    const OpenRegForm = () => {
        isOpen();
        document.body.classList.add("modal-open");
    };

    const PasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    return (
        <div className="modal__content">
            <h2>Войти в аккаунт</h2>
            <form className="modal__content__form" method="post">
                <div>
                    <label htmlFor="userName">Имя пользователя</label>
                    <input
                        placeholder="Введите имя"
                        id="userName"
                        type="text"
                        required
                        autoFocus
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
                <button>Войти</button>
            </form>
            <div className="modal__content__info">
                Нет учетной записи?{" "}
                <span
                    onClick={() => {
                        onClose();
                        OpenRegForm();
                    }}
                >
                    Зарегистрируйтесь!
                </span>
            </div>
        </div>
    );
};
