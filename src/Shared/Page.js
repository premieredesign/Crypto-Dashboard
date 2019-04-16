import React, {useContext} from 'react';
import {AppContext} from "../App/AppProvider";

export default function({name, children}){
    const {page} = useContext(AppContext);
    if (page !== name) {
        return null;
    }
    return <div>{children}</div>
}
