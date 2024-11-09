import { useEffect, ReactNode } from "react";
import { Transition } from "react-transition-group";

type WrapperProps = {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
};

type State = "entering" | "entered" | "exiting" | "exited";

export const Wrapper: React.FC<WrapperProps> = ({
    isOpen,
    onClose,
    children,
}) => {

    useEffect(() => {
        isOpen
            ? document.body.classList.add("modal-open")
            : document.body.classList.remove("modal-open");
    }, [isOpen]);

    return (
        <>
            <Transition in={isOpen} timeout={200} unmountOnExit={true}>
                {(state: State) => (
                    <form className={`modal modal--${state}`}>
                        <div className="modal__wrapper">
                            <div className="modal__wrapper__content">
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        onClose();
                                    }}
                                >
                                    <img
                                        src="./img/close-button.svg"
                                        alt="Закрыть форму"
                                    />
                                </button>
                                {children}
                            </div>
                        </div>
                    </form>
                )}
            </Transition>
        </>
    );
};
