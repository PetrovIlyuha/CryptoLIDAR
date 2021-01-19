import * as React from 'react';
import axios from 'axios';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {
  withStyles,
  Theme,
  createStyles,
  makeStyles,
} from '@material-ui/core/styles';

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }),
)(TableCell);

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }),
)(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: '100%',
    minHeight: '100%',
  },
  coinImage: {
    width: 40,
  },
  cointPriceChange: {
    textAlign: 'center',
    width: '110%',
    color: 'whitesmoke',
    fontWeight: 900,
  },
});

export default function DataTable() {
  const classes = useStyles();
  const [coins, setCoins] = React.useState();

  console.log(coins);

  interface Coin {
    image: string;
    id: string;
    coinName: string;
    majorMarket: string;
    lastPrice: number;
    dailyChange: number;
  }

  const [rows, setRows] = React.useState<Coin[] | null>([]);

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
    console.log(coinsRows);
    if (coinsRows) {
      setRows([...coinsRows]);
    }
  }, [coins]);

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label='customized table'>
          <TableHead>
            <TableRow>
              <StyledTableCell style={{ borderRight: '1px solid grey' }}>
                Coin Logo
              </StyledTableCell>
              <StyledTableCell
                align='center'
                style={{ borderRight: '1px solid grey' }}>
                Ticker
              </StyledTableCell>
              <StyledTableCell
                align='center'
                style={{ borderRight: '1px solid grey' }}>
                Coin FullName
              </StyledTableCell>
              <StyledTableCell
                align='center'
                style={{ borderRight: '1px solid grey' }}>
                Major Exchange
              </StyledTableCell>
              <StyledTableCell
                align='center'
                style={{ borderRight: '1px solid grey' }}>
                Last Price
              </StyledTableCell>
              <StyledTableCell align='center'>24 Hour Change</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* @ts-ignore */}
            {rows.map(coin => (
              <StyledTableRow key={coin.id}>
                <StyledTableCell scope='row'>
                  <img src={coin.image} className={classes.coinImage} />
                </StyledTableCell>
                <StyledTableCell align='right' style={{ fontWeight: 700 }}>
                  {coin.id}
                </StyledTableCell>
                <StyledTableCell align='right' style={{ fontWeight: 700 }}>
                  {coin.coinName}
                </StyledTableCell>
                <StyledTableCell align='right' style={{ fontWeight: 700 }}>
                  {coin.majorMarket}
                </StyledTableCell>
                <StyledTableCell
                  align='right'
                  style={{
                    width: '110%',
                    textAlign: 'center',
                    fontWeight: 900,
                  }}>
                  $ {coin.lastPrice}
                </StyledTableCell>
                <StyledTableCell
                  align='right'
                  className={classes.cointPriceChange}
                  style={{
                    background:
                      coin.dailyChange > 0
                        ? 'linear-gradient(-45deg, #3FC24A, green)'
                        : 'linear-gradient(-45deg, #EB4726, red)',
                  }}>
                  ${coin.dailyChange.toFixed(2)}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
