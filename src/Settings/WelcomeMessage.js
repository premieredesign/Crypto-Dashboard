import React, {useContext} from 'react';
import {AppContext} from "../App/AppProvider";

export default function() {
    const {firstVisit} = useContext(AppContext);
    return (
        firstVisit ? <div>
            Welcome to CryptoDash, please select your favorite coins to begin.{' '}
        </div>: null
    );
}
