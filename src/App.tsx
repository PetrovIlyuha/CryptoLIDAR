import React from 'react';

import Header from './components/Header';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Paper, TextField } from '@material-ui/core';
import Calculator from './components/Calculator';
import CurrenciesList from './components/Table';

const useStyles = makeStyles(theme => ({
  mainAppArea: {
    marginTop: '2rem',
    height: '40vh',
  },
  table: {},
}));

const App: React.FC = () => {
  const classes = useStyles();
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
          <Grid item md={7} lg={7}>
            <CurrenciesList />
            {/* <Paper elevation={2} className={classes.table}>
              Table of Currencies
            </Paper> */}
          </Grid>
          <Calculator />
        </Grid>
      </Grid>
    </Container>
  );
};

export default App;
