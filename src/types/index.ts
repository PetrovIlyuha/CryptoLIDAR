export interface Coin {
  image: string;
  id: string;
  coinName: string;
  majorMarket: string;
  lastPrice: number;
  dailyChange: number;
}

export interface Currency {
  price: number;
  name: string;
  fullname: string;
}
