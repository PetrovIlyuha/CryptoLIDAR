import React from 'react';
import Header from './components/Header';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Calculator from './components/Calculator';
import CurrenciesList from './components/Table';

const useStyles = makeStyles(theme => ({
  mainAppArea: {
    marginTop: '2rem',
    height: '50vh',
  },
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
          <Grid item md={8} lg={8}>
            <CurrenciesList />
          </Grid>
          <Grid item container md={4} lg={4} style={{ height: '50%' }}>
            <Calculator />
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default App;
