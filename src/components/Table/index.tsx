import * as React from 'react';
import { inject, observer } from 'mobx-react';
import CurrencyStore from '../../stores/currencyStore';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Tooltip from '@material-ui/core/Tooltip';
import {
  withStyles,
  Theme,
  createStyles,
  makeStyles,
} from '@material-ui/core/styles';
import Spinner from '../ui/Spinner';
import { autorun } from 'mobx';
import { Typography } from '@material-ui/core';

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
      border: '4px solid darkgrey',
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

const HtmlTooltip = withStyles((theme: Theme) => ({
  tooltip: {
    backgroundColor: '#333370',
    color: 'rgba(243, 237, 237, 0.87)',
    maxWidth: 220,
    textAlign: 'center',
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
  },
}))(Tooltip);

interface TableProps {
  currenciesStore?: CurrencyStore;
}

const CurrenciesList = inject('currenciesStore')(
  observer(({ currenciesStore }: TableProps) => {
    const classes = useStyles();
    const coins = currenciesStore!.getCoins;
    const visualChanges = currenciesStore!.getDiffAssets;
    console.log(visualChanges);
    React.useEffect(() => {
      if (currenciesStore) {
        currenciesStore.getCryptoData();
        setInterval(() => {
          console.log('calling api');
          currenciesStore.getCryptoData();
        }, 60 * 1000);
      }
    }, []);

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
                  <HtmlTooltip
                    title={
                      <React.Fragment>
                        <Typography color='inherit' variant='caption'>
                          Click to Select as one of a pair to produce an
                          exchange rate
                        </Typography>
                      </React.Fragment>
                    }>
                    <StyledTableRow
                      key={coin.id}
                      className={classes.coinTableRow}>
                      <StyledTableCell scope='row'>
                        <img src={coin.image} className={classes.coinImage} />
                      </StyledTableCell>
                      <StyledTableCell
                        align='right'
                        style={{ fontWeight: 700 }}>
                        {coin.id}
                      </StyledTableCell>
                      <StyledTableCell
                        align='right'
                        style={{ fontWeight: 700 }}>
                        {coin.coinName}
                      </StyledTableCell>
                      <StyledTableCell
                        align='right'
                        style={{ fontWeight: 700 }}>
                        {coin.majorMarket}
                      </StyledTableCell>
                      <StyledTableCell
                        align='right'
                        style={{
                          width: '110%',
                          textAlign: 'center',
                          fontWeight: 900,
                          backgroundColor: `${
                            visualChanges
                              ? visualChanges[coin.coinName] === 'rising'
                                ? '#E56A5A'
                                : visualChanges[coin.coinName] === 'falling'
                                ? '#62CD54'
                                : '#D9E9D7'
                              : 'lightgrey'
                          }`,
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
                  </HtmlTooltip>
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
