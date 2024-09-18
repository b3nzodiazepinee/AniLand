import { useState, useRef } from "react";

const Search: React.FC = () => {
    const [loupeShow, setLoupeShow] = useState(false);
    const [textIndent, setTextIndent] = useState("25px");
    const [isActive, setIsActive] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleFocus = () => {
        setLoupeShow(true);
        setTextIndent("0px");
    };

    const handleSearchClick = () => {
        setIsActive(!isActive);
        if (!isActive && inputRef.current) {
            inputRef.current.focus();
        }
    };

    const handleBlur = (event: any) => {
        if (event.target.value.trim() === "") {
            setLoupeShow(false);
            setTextIndent("25px");
        } else {
            setTextIndent("0px");
        }
    };

    return (
        <div className="search" onClick={handleSearchClick}>
            {!loupeShow && (
                <svg
                    fill="#a6a6a6"
                    height="17px"
                    width="17px"
                    version="1.1"
                    id="Layer_1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    viewBox="-51.2 -51.2 614.40 614.40"
                    xmlSpace="preserve"
                    stroke="#a6a6a6"
                    strokeWidth="25.6"
                >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        stroke="#CCCCCC"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                        {" "}
                        <g>
                            {" "}
                            <g>
                                {" "}
                                <path d="M508.255,490.146l-128-128c-0.06-0.06-0.137-0.077-0.196-0.128c34.193-38.434,55.142-88.917,55.142-144.418 c0-120.175-97.425-217.6-217.6-217.6S0.001,97.425,0.001,217.6s97.425,217.6,217.6,217.6c55.501,0,105.975-20.949,144.418-55.151 c0.06,0.06,0.077,0.137,0.128,0.196l128,128c2.5,2.509,5.777,3.755,9.054,3.755s6.554-1.246,9.054-3.746 C513.247,503.253,513.247,495.147,508.255,490.146z M217.601,409.6c-105.865,0-192-86.135-192-192s86.135-192,192-192 s192,86.135,192,192S323.466,409.6,217.601,409.6z"></path>{" "}
                            </g>{" "}
                        </g>{" "}
                    </g>
                </svg>
            )}
            <input
                ref={inputRef}
                onFocus={handleFocus}
                onBlur={handleBlur}
                type="text"
                placeholder="Поиск аниме"
                style={{ textIndent: textIndent }}
            ></input>
        </div>
    );
};

export default Search;
