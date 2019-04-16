import React, {useContext} from 'react';
import {AppContext} from "../App/AppProvider";



export default function({children}){
    const {coinList, firstVisit, prices} = useContext(AppContext);
    if (!coinList) {
        return <div>Coins Loading...</div>
    }

    if (!firstVisit && !prices) {
        return <div> Loading Prices</div>
    }
    return <div>{children}</div>
}
