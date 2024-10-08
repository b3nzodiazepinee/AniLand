import React from "react";
import { useNavigate } from "react-router-dom";
import { SearchData } from "./Search";

interface SearchResultProps {
    searchData: SearchData;
    clearSearch: () => void;
}

export const SearchResult: React.FC<SearchResultProps> = ({
    searchData,
    clearSearch,
}) => {
    const navigate = useNavigate();

    const handleClick = () => {
        clearSearch();
        navigate(`/anime/${searchData.code}`);
    };
    return (
        <div className="search__result" onClick={handleClick}>
            <img
                src={"https://anilibria.tv" + searchData.posters?.original?.url}
            />
            <span>
                <h3>{searchData.names.ru}</h3>
                <p>
                    {searchData.season.year} • {searchData.genres[0]}
                </p>
            </span>
        </div>
    );
};
