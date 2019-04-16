import React from 'react';

export default function({coin, style}) {
    return <img
        src={`http://cryptocompare.com/${coin.ImageUrl}`}
        style={style || {height: '50px'}}
        alt={coin.CoinSymbol}/>;
}
