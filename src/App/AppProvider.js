import React from 'react';
import _ from 'lodash';
const cc = require('cryptocompare');


// The AppContext in the @Input
export const AppContext = React.createContext();

const MAX_FAVORITES = 10;

// The AppProvider is the @Output
export class AppProvider extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            page: 'dashboard',
            favorites: ['BTC', 'ETH', 'XMR', 'DOGE'],
            ...this.saveSetting(),
            addCoin: this.addCoin,
            removeCoin: this.removeCoin,
            isInFavorites: this.isInFavorites,
            confirmedFavorites: this.confirmedFavorites,
            setPage: this.setPage,
            setFilteredCoins: this.setFilteredCoints
        }
    }


    componentDidMount() {
        this.fetchCoins();
        this.fetchPrices();
    }

    fetchCoins = async () => {
        let coinList = (await cc.coinList()).Data;
        this.setState({coinList});
    };

    fetchPrices = async () => {
        if (this.state.firstVisit) return;
        let prices = await this.prices();
        this.setState({prices});
    };

    prices = async () => {
        let returnData = [];
        for (let i = 0; i < this.state.favorites.length; i++){
            try {
                let priceData = await cc.priceFull(this.state.favorites[i], 'USD');
                returnData.push(priceData);
            } catch (e) {
                console.warn('Fetch prices error', e);
            }
        }
        return returnData;
    };

    isInFavorites = key => _.includes(this.state.favorites, key);

    addCoin = key => {
        let favorites = [...this.state.favorites];
        if (favorites.length < MAX_FAVORITES) {
            favorites.push(key);
            this.setState({favorites})
        }
    };

    removeCoin = key => {
        let favorites = [...this.state.favorites];
        this.setState({favorites: _.pull(favorites, key)})
    };

    confirmedFavorites = () => {
        this.setState({
            firstVisit: false,
            page: 'dashboard'
        }, () => {
            this.fetchPrices();
        });
        localStorage.setItem('cryptoDash', JSON.stringify({
            favorites: this.state.favorites
        }))
    }

    saveSetting(){
        let cryptoDashData = JSON.parse(localStorage.getItem('cryptoDash'));
        if (!cryptoDashData) {
            return {page: 'settings', firstVisit: true}
        }
        let {favorites} = cryptoDashData;
        return {favorites};
    }
    setPage = page => this.setState({page});
    setFilteredCoints = (filteredCoins) => this.setState({filteredCoins});

    render(){
        return (
            <AppContext.Provider value={this.state}>
                {this.props.children}
            </AppContext.Provider>
        )
    }
}
