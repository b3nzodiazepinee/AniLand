import { useState, useCallback, useEffect, useRef } from "react";
import axios from "axios";
import debounce from "lodash.debounce";
import { SearchResult } from "./index";
import { Names, Posters, Season, Genre } from "../redux/globalTypes";

export interface SearchData {
    id: number;
    code: string;
    names: Names;
    posters: Posters;
    season: Season;
    genres: Genre[];
}

interface SearchResponse {
    list: SearchData[];
}

export const Search: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [loupeShow, setLoupeShow] = useState(false);
    const [textIndent, setTextIndent] = useState("25px");
    const [isActive, setIsActive] = useState(false);
    const [value, setValue] = useState("");
    const [searchData, setSearchData] = useState<SearchData[]>([]);

    const inputRef = useRef<HTMLInputElement>(null);

    const clearSearch = () => {
        setValue("");
        setSearchData([]);
    };

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

    useEffect(() => {
        if (value) {
            fetchSearchData(value);
        } else {
            setSearchData([]);
        }
    }, [value]);

    const fetchSearchData = useCallback(
        debounce(async (searchValue: string) => {
            setLoading(true);

            try {
                const res = await axios.get<SearchResponse>(
                    `https://api.anilibria.tv/api/v3/title/search?search=${searchValue}&filter=id,code,names.ru,posters.original.url,season.year,genres[0]&limit=10`
                );
                setSearchData(res.data.list);
                setLoading(false);
                console.log(res.data.list);
            } catch (error) {
                console.error("Ошибка запроса поиска:", error);
                setLoading(false);
            }
        }, 400),
        []
    );

    const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
        console.log(e.target.value);
    };

    return (
        <>
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
                    value={value}
                    onChange={onChangeInput}
                    ref={inputRef}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    type="text"
                    placeholder="Поиск аниме"
                    style={{ textIndent: textIndent }}
                />
            </div>
            <div className="search__results">
                {loading && searchData.length === 0 ? (
                    <>Поиск...</>
                ) : (
                   
                    searchData.map((data) => (
                        <SearchResult
                            searchData={data}
                            key={data.id}
                            clearSearch={clearSearch}
                        />
                    ))
                )}
            </div>
        </>
    );
};
