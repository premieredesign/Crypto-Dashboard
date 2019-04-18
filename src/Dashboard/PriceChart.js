import React, {useContext} from 'react';
import highchartsConfig from './HighchartsConfig'
import {Tile} from "../Shared/Tile";
import {AppContext} from "../App/AppProvider";
import ReactHighcharts from 'react-highcharts';
import HighchartsTheme from './HighchartsTheme'

ReactHighcharts.Highcharts.setOptions(HighchartsTheme);

export default function() {
    const {historical} = useContext(AppContext)
    return (
        <Tile>
            {
                historical ?
                <ReactHighcharts config={highchartsConfig(historical)}/>
                :
                <div>Loading Historical Data...</div>
            }
        </Tile>
    );
}
