import axios from 'axios';
import { action, computed, observable, autorun } from 'mobx';
import { Coin } from '../types';

type AssetsPriceChanges = { [key: string]: string };
class СurrencyStore {
  @observable private items: Coin[] = [];
  @observable private diffAssets: AssetsPriceChanges;

  @computed
  get getCoins() {
    return this.items;
  }

  @computed
  get getDiffAssets() {
    return this.diffAssets;
  }

  @action
  setCoins = (items: Coin[]): void => {
    if (this.items.length > 0) {
      this.diffAssets = this.diffCurrencies(items, this.items).reduce(
        (acc: AssetsPriceChanges, newChanges: Coin) => {
          const oldCoin: Coin = this.items.find(
            coin => coin.coinName === newChanges.coinName,
          )!;
          const changeDetection: string =
            newChanges.lastPrice === oldCoin.lastPrice
              ? 'stale'
              : newChanges.lastPrice > oldCoin.lastPrice
              ? 'rising'
              : 'falling';
          acc[newChanges.coinName] = changeDetection;
          return acc;
        },
        {},
      );
      this.items = items;
      setTimeout(() => {
        this.diffAssets = {};
      }, 15000);
    } else {
      this.items = items;
    }
  };

  diffCurrencies(newCoins: Coin[], oldCoins: Coin[]) {
    return newCoins.filter(
      (coin, idx) => coin.lastPrice !== oldCoins[idx].lastPrice,
    );
  }

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
        this.setCoins(coins);
      });
  };
}

export default СurrencyStore;
