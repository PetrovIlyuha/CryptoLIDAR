import React from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { Box, Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import { Currency } from '../../types';

const useStyles = makeStyles(theme => ({
  exchangeArea: {
    padding: '15% 10px',
    background:
      'radial-gradient(100% 225% at 100% 0%, #FF0000 0%, #000000 100%), linear-gradient(236deg, #00C2FF 0%, #000000 100%), linear-gradient(135deg, #CDFFEB 0%, #CDFFEB 36%, #009F9D 36%, #009F9D 60%, #07456F 60%, #07456F 67%, #0F0A3C 67%, #0F0A3C 100%)',
    backgroundBlendMode: 'overlay, hard-light, normal',
    color: 'white',
  },
  calcHeader: {
    textAlign: 'center',
    fontFamily: 'Poppins',
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: 10,
    clipPath: 'polygon(15% 0, 100% 0, 85% 100%, 0% 100%)',
    marginBottom: 15,
  },
  currencySelectorField: {
    color: 'white',
    '& .MuiFormHelperText-root': {
      fontSize: '0.7rem',
      width: '100%',
      marginLeft: 0,
      fontFamily: 'Righteous',
    },
    '& .MuiInputBase-input ': {
      backgroundColor: '#27346C',
      color: 'white',
      borderRadius: 10,
    },
    '& .MuiFormLabel-root': {
      color: 'lightgreen',
      fontFamily: 'Righteous',
    },
  },
  currencyHeaders: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  currencyTitle: {
    fontFamily: 'Poppins',
  },
  amountInput: {
    webkitOuterSpinButton: {
      webkitAppearance: 'none',
      margin: 0,
    },
    webkitInnerSpinButton: {
      webkitAppearance: 'none',
      margin: 0,
    },
    mozAppearance: 'textfield',

    '& .MuiFormLabel-root': {
      color: 'lightgreen',
      fontFamily: 'Righteous',
    },
    '& .MuiInputBase-input ': {
      backgroundColor: '#27346C',
      color: 'white',
      borderRadius: 10,
    },
    '& .MuiTextField-root ': {
      borderRadius: 10,
    },
  },
}));

interface CalcProps {
  currencies: Currency[] | null;
}

const Calculator = ({ currencies }: CalcProps) => {
  const classes = useStyles();
  const currencyData = currencies?.map(coin => {
    return {
      value: coin.fullname,
      label: coin.name,
      price: coin.price,
    };
  });

  const defaultCoin1 = currencyData && currencyData[0];
  const defaultCoin2 = currencyData && currencyData[1];
  const [selectedCurrency, setSelectedCurrency] = React.useState({
    currency1: { ...defaultCoin2 },
    currency2: { ...defaultCoin1 },
  });
  const [amount, setAmount] = React.useState({
    asset1: 0,
    asset2: 0,
  });

  const { currency1, currency2 } = selectedCurrency;
  const { asset1, asset2 } = amount;

  const handleChange = (name: string) => (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const currentlySetAsset = currencyData?.find(
      asset => asset.value === event.target.value,
    );
    setSelectedCurrency({ ...selectedCurrency, [name]: currentlySetAsset });
  };

  const recalculateRates = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    asset: string,
  ) => {
    if (asset === 'asset1') {
      let asset2Amount = +(
        (parseInt(e.target.value) * currency1.price) /
        currency2.price
      ).toFixed(2);
      setAmount({ asset1: parseInt(e.target.value), asset2: asset2Amount });
    } else {
      let asset1Amount = +(
        (parseInt(e.target.value) * currency2.price) /
        currency1.price
      ).toFixed(2);
      setAmount({ asset2: parseInt(e.target.value), asset1: asset1Amount });
    }
  };

  return (
    <Paper elevation={2} className={classes.exchangeArea}>
      <Typography variant='h5' className={classes.calcHeader}>
        Crypto Exchange Rates
      </Typography>
      <Grid item container spacing={2}>
        <Grid item md={12}>
          <Box className={classes.currencyHeaders}>
            {!currency1 && (
              <Typography variant='body2' className={classes.currencyTitle}>
                Choose Basis Currency{' '}
              </Typography>
            )}
            <Typography variant='body1' className={classes.currencyTitle}>
              {currency1 && `Selected: ${currency1.value}`}
            </Typography>
          </Box>
        </Grid>
        <Grid item md={7}>
          <TextField
            variant='filled'
            label='Amount'
            type='number'
            value={asset1}
            onChange={e => recalculateRates(e, 'asset1')}
            className={classes.amountInput}></TextField>
        </Grid>
        <Grid item md={5}>
          <TextField
            id='filled-select-currency'
            select
            label='Currency'
            value={currency1}
            onChange={handleChange('currency1')}
            helperText='Select currency'
            className={classes.currencySelectorField}
            variant='filled'>
            {currencyData?.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.value}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>
      <Grid item container spacing={2}>
        <Grid item md={12}>
          <Box className={classes.currencyHeaders}>
            {!currency2 && (
              <Typography variant='body2' className={classes.currencyTitle}>
                Choose Pair Currency{' '}
              </Typography>
            )}
            <Typography variant='body1' className={classes.currencyTitle}>
              {currency2 && `Selected: ${currency2.value}`}
            </Typography>
          </Box>
        </Grid>
        <Grid item md={7}>
          <TextField
            variant='filled'
            label='Amount'
            type='number'
            onChange={e => recalculateRates(e, 'asset2')}
            value={asset2}
            className={classes.amountInput}></TextField>
        </Grid>
        <Grid item md={5}>
          <TextField
            id='filled-select-currency'
            select
            label='Currency'
            value={currency2}
            className={classes.currencySelectorField}
            onChange={handleChange('currency2')}
            helperText='Select currency'
            variant='filled'>
            {currencyData?.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.value}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Calculator;
