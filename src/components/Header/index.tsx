import React, { useEffect } from 'react';
import lottie from 'lottie-web';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';
import RobotLogoAnimation from './Chatbot Colour Animation.json';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  header: {
    background:
      'linear-gradient(115deg, #FF9797 0%, #0F0068 100%), linear-gradient(245deg, #A8FFE5 0%, #0500FF 100%), radial-gradient(100% 225% at 100% 0%, #FF003D 0%, #000000 100%), radial-gradient(90% 160% at 0% 100%, #E42C64 0%, #E42C64 30%, #614AD3 calc(30% + 1px), #614AD3 60%, #2D248A calc(60% + 1px), #2D248A 70%, #121B74 calc(70% + 1px), #121B74 100%), linear-gradient(100deg, #48466F 9%, #48466D 35%, #3D84A8 calc(35% + 1px), #3D84A8 65%, #46CDCF calc(65% + 1px), #46CDCF 70%, #ABEDD8 calc(70% + 1px), #ABEDD8 100%)',
    backgroundBlendMode: 'overlay, overlay, overlay, overlay, normal',
  },
  mainLogo: {
    maxWidth: 140,
  },
}));

const Header = () => {
  const classes = useStyles();
  let animaRef = React.createRef<HTMLDivElement>();
  useEffect(() => {
    if (animaRef.current) {
      lottie.loadAnimation({
        container: animaRef.current,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        animationData: RobotLogoAnimation,
      });
    }
  }, [animaRef.current]);
  return (
    <AppBar position='static'>
      <Toolbar variant='dense' className={classes.header}>
        <IconButton
          edge='start'
          color='inherit'
          aria-label='menu'
          className={classes.mainLogo}>
          <div ref={animaRef}></div>
        </IconButton>
        <h4>CryptoLIDAR</h4>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
