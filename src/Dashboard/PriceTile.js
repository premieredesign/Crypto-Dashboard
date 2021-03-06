import React, {useContext} from 'react';
import styled, {css} from 'styled-components';
import {SelectableTile} from "../Shared/Tile";
import {CoinHeaderGridStyled} from "../Settings/CoinHeaderGrid";
import {fontSize3, fontSizeBig, greenBoxShadow} from "../Shared/Styles";
import {AppContext} from "../App/AppProvider";


const JustifiedRight = styled.div`
    justify-self: right;
`;

const JustifiedLeft = styled.div`
    justify-self: left;
`;


const TickerPrice = styled.div`
    ${fontSizeBig}
`;

const ChangePct = styled.div`
    color: green;
    ${props => props.red && css`
        color: red;
    `}
`;

const PriceTileStyled = styled(SelectableTile)`
    ${props => props.compact && css`
        display: grid;
        grid-gap: 5px;
        ${fontSize3}
        grid-template-columns: repeat(3, 1fr);
        justified-items: right;
    `}
    
    ${props => props.favorite && css`
        ${greenBoxShadow}
        pointer-event: none;
    `}
`;

const numberFormatter = number => {
    return +(number + '').slice(0, 7);
}

function ChangePercent({data}) {
    return (
        <JustifiedRight>
            <ChangePct red={data.CHANGEPCT24HOUR < 0}>
                {numberFormatter(data.CHANGEPCT24HOUR)}%
            </ChangePct>
        </JustifiedRight>
    );
}


function PriceTileCompact({sym, data, favorite, setCurrentFavorite}){
    return (
        <PriceTileStyled compact favorite={favorite} onClick={setCurrentFavorite}>
            <JustifiedLeft>{sym}</JustifiedLeft>
            <ChangePercent data={data} />
            <TickerPrice>
                ${numberFormatter(data.PRICE)}
            </TickerPrice>
        </PriceTileStyled>
    );
}

function PriceTile({sym, data, favorite, setCurrentFavorite}) {
    return (
        <PriceTileStyled favorite={favorite} onClick={setCurrentFavorite}>
            <CoinHeaderGridStyled>
                <div>{sym}</div>
                <ChangePercent data={data} />
            </CoinHeaderGridStyled>
            <TickerPrice>
                ${numberFormatter(data.PRICE)}
            </TickerPrice>
        </PriceTileStyled>
    );
}

export default function ({price, index}) {
    let {currentFavorite, setCurrentFavorite} = useContext(AppContext);
    let sym = Object.keys(price)[0];
    let data = price[sym]['USD'];
    let TileClass = index < 5 ? PriceTile : PriceTileCompact;
    return (
        <TileClass
            setCurrentFavorite={() => setCurrentFavorite(sym)}
            favorite={currentFavorite === sym}
            sym={sym}
            data={data} />
    );
}
