import React from 'react';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { Box, Grid, makeStyles, Paper, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  exchangeArea: {
    padding: '30% 20px',
  },
  calcHeader: {
    textAlign: 'center',
    fontFamily: 'Poppins',
    marginBottom: 30,
  },
  currencySelectorField: {
    '& .MuiFormHelperText-root': {
      fontSize: '0.7rem',
      width: '100%',
      marginLeft: 0,
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

const data = [
  {
    value: 'USD',
    label: '$',
  },
  {
    value: 'EUR',
    label: '€',
  },
  {
    value: 'BTC',
    label: '฿',
  },
  {
    value: 'JPY',
    label: '¥',
  },
];

const Calculator = () => {
  const classes = useStyles();
  const [currencies, setCurrencies] = React.useState({
    currency1: '',
    currency2: '',
  });

  const { currency1, currency2 } = currencies;

  const handleChange = (name: string) => (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    console.log(name);
    setCurrencies({ ...currencies, [name]: event.target.value });
  };
  return (
    <Grid item container md={5} lg={5}>
      <Paper elevation={2} className={classes.exchangeArea}>
        <Typography variant='h5' className={classes.calcHeader}>
          Crypto Exchange Rates
        </Typography>
        <Grid item container spacing={2}>
          <Grid item md={12}>
            <Box className={classes.currencyHeaders}>
              <Typography variant='body2' className={classes.currencyTitle}>
                Choose Basis Currency{' '}
              </Typography>
              <Typography variant='body1' className={classes.currencyTitle}>
                {currency1 && `Selected: ${currency1}`}
              </Typography>
            </Box>
          </Grid>
          <Grid item md={8}>
            <TextField
              variant='filled'
              label='Amount'
              className={classes.amountInput}></TextField>
          </Grid>
          <Grid item md={4}>
            <TextField
              id='filled-select-currency'
              select
              label='Currency'
              value={currency1}
              onChange={handleChange('currency1')}
              helperText='Select currency'
              className={classes.currencySelectorField}
              variant='filled'>
              {data.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
        <Grid item container spacing={2}>
          <Grid item md={12}>
            <Box className={classes.currencyHeaders}>
              <Typography variant='body2' className={classes.currencyTitle}>
                Choose Pair Currency{' '}
              </Typography>
              <Typography variant='body1' className={classes.currencyTitle}>
                {currency2 && `Selected: ${currency2}`}
              </Typography>
            </Box>
          </Grid>
          <Grid item md={8}>
            <TextField
              variant='filled'
              label='Amount'
              className={classes.amountInput}></TextField>
          </Grid>
          <Grid item md={4}>
            <TextField
              id='filled-select-currency'
              select
              label='Currency'
              value={currency2}
              className={classes.currencySelectorField}
              onChange={handleChange('currency2')}
              helperText='Select currency'
              variant='filled'>
              {data.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default Calculator;
