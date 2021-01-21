import axios from 'axios';
import { action, computed, makeAutoObservable, observable } from 'mobx';
import { Coin } from '../types';

class СurrencyStore {
  @observable private items: Coin[] = [];

  @computed
  get getCoins() {
    return this.items;
  }

  @action
  setCoins = (items: Coin[]): void => {
    this.items = items;
  };

  @action
  getCryptoData = async () => {
    await axios
      .get(
        `https://min-api.cryptocompare.com/data/top/totalvolfull?limit=10&tsym=USD&api_key=${process.env.REACT_APP_API_KEY}`,
      )
      .then(({ data }) => {
        const coins: Coin[] = data.Data.map((coin: any) => {
          return {
            image: `https://cryptocompare.com${coin.CoinInfo.ImageUrl}`,
            id: coin.CoinInfo.Internal,
            coinName: coin.CoinInfo.FullName,
            majorMarket: coin.RAW.USD.LASTMARKET,
            lastPrice: coin.RAW.USD.PRICE,
            dailyChange: coin.RAW.USD.CHANGE24HOUR,
          };
        });
        this.items = coins;
      });
  };
}

export default СurrencyStore;
