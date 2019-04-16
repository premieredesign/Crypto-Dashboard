import React, {useContext} from 'react';
import styled from 'styled-components';
import {backgroundColor2, fontSize2} from "../Shared/Styles";
import {AppContext} from "../App/AppProvider";
import _ from 'lodash';
import fuzzy from 'fuzzy';



const SearchGrid = styled.div`
    display: grid;
    grid-template-columns: 200px 1fr;
`;

const SearchInput = styled.input`
    ${backgroundColor2}
    ${fontSize2}
    border: 1px solid;
    height: 25px;
    color: #1163c9;
    place-self: center left;
`;

const handleFilter = _.debounce((inputValue, coinList, setFilteredCoins) => {
    let coinSymobls = Object.keys(coinList);
    let coinNames = coinSymobls.map(sym => coinList[sym].CoinName);
    let allStringsToSearch = coinSymobls.concat(coinNames);
    let results = fuzzy
        .filter(inputValue, allStringsToSearch, {})
        .map((result) => result.string);
    let filteredCoins = _.pickBy(coinList, (result, symKey) => {
        let coinName = result.CoinName;
        return (_.includes(results, symKey) || _.includes(results, coinName));
    });
    setFilteredCoins(filteredCoins);
}, 500);

function filteredCoins(e, setFilteredCoins, coinList) {
    let inputValue = e.target.value;
    if (!inputValue) {
        setFilteredCoins(null);
        return;
    }
    handleFilter(inputValue, coinList, setFilteredCoins);
}

export default function() {
    const {setFilteredCoins, coinList} = useContext(AppContext);
    return (
        <SearchGrid>
            <h2>Search all coins</h2>
            <SearchInput onKeyUp={(e) => filteredCoins(e, setFilteredCoins, coinList)}/>
        </SearchGrid>
    );
}
