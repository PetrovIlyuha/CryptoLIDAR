import React from 'react';
import axios from 'axios';
import Header from './components/Header';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Calculator from './components/Calculator';
import CurrenciesList from './components/Table';
import { Coin, Currency } from './types';

const useStyles = makeStyles(theme => ({
  mainAppArea: {
    marginTop: '2rem',
    height: '50vh',
  },
}));

const App: React.FC = () => {
  const classes = useStyles();
  const [coins, setCoins] = React.useState<any>();

  const [rows, setRows] = React.useState<Coin[] | null>([]);
  const [currencies, setCurrencies] = React.useState<Currency[] | null>([]);

  const getCryptoData = async () => {
    const {
      data: { Data: coinsData },
    } = await axios.get(
      `https://min-api.cryptocompare.com/data/top/totalvolfull?limit=10&tsym=USD&api_key=${process.env.REACT_APP_API_KEY}`,
    );
    return coinsData;
  };

  React.useEffect(() => {
    const marketCaps = getCryptoData();
    marketCaps.then(data => {
      setCoins(data);
    });
  }, []);

  React.useEffect(() => {
    // @ts-ignore
    const coinsRows: Coin[] = coins?.map(coin => {
      return {
        image: `https://cryptocompare.com${coin.CoinInfo.ImageUrl}`,
        id: coin.CoinInfo.Internal,
        coinName: coin.CoinInfo.FullName,
        majorMarket: coin.RAW.USD.LASTMARKET,
        lastPrice: coin.RAW.USD.PRICE,
        dailyChange: coin.RAW.USD.CHANGE24HOUR,
      };
    });
    // @ts-ingore
    const currencyList: Currency[] = coins?.map((coin: any) => {
      return {
        price: coin.RAW.USD.PRICE,
        name: coin.CoinInfo.Internal,
        fullname: coin.CoinInfo.FullName,
      };
    });
    if (currencyList) {
      setCurrencies([...currencyList]);
    }
    if (coinsRows) {
      setRows([...coinsRows]);
    }
  }, [coins]);
  return (
    <Container maxWidth='md'>
      <CssBaseline />
      <Grid container direction='column'>
        <Grid item md={12}>
          <Header />
        </Grid>
        <Grid
          item
          container
          spacing={3}
          justify='space-between'
          className={classes.mainAppArea}>
          <Grid item md={8} lg={8}>
            <CurrenciesList />
          </Grid>
          <Grid item container md={4} lg={4} style={{ height: '50%' }}>
            <Calculator currencies={currencies} />
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default App;
