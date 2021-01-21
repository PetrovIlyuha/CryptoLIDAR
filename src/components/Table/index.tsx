import * as React from 'react';
import { inject, observer } from 'mobx-react';
import CurrencyStore from '../../stores/currencyStore';
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
import Spinner from '../ui/Spinner';

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
    cursor: 'pointer',
  },
  coinTableRow: {
    transition: 'all 0.15s ease-in-out',
    '&:hover': {
      backgroundColor: '#E7DEDD',
    },
  },
  coinImage: {
    width: 40,
  },
  coinPriceChange: {
    textAlign: 'center',
    width: '110%',
    color: 'whitesmoke',
    fontWeight: 900,
  },
});

interface TableProps {
  currenciesStore?: CurrencyStore;
}

const CurrenciesList = inject('currenciesStore')(
  observer(({ currenciesStore }: TableProps) => {
    const classes = useStyles();
    const coins = currenciesStore!.getCoins;
    console.log(coins);

    React.useEffect(() => {
      if (currenciesStore) {
        currenciesStore.getCryptoData();
      }
    }, [currenciesStore]);

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
              {!coins ? (
                <Spinner />
              ) : (
                coins.map(coin => (
                  <StyledTableRow
                    key={coin.id}
                    className={classes.coinTableRow}>
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
                      className={classes.coinPriceChange}
                      style={{
                        background:
                          coin.dailyChange > 0
                            ? 'linear-gradient(-45deg, #3FC24A, green)'
                            : 'linear-gradient(-45deg, #EB4726, #972519)',
                      }}>
                      ${coin.dailyChange.toFixed(2)}
                    </StyledTableCell>
                  </StyledTableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }),
);

export default CurrenciesList;
