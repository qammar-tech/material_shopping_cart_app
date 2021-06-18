import React from 'react';
import DashboardComponent from '../Components/Dashboard/Dashboard';
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import Particles from 'react-particles-js';
import particlesConfig from '../Components/JsonFiles/particlesConfig.json';


const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    height: '100%',
    overflow: 'hidden',
    background: '#021b39'
  },
  appBarSpacer: theme.mixins.toolbar,
  container: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1)
  },
  app_some: {
    overflow: 'hidden',
    position: 'absolute',
    top: '0px',
    left: '0px',
    bottom: '0px',
    right: '0px',
    zIndex: '0',
  },
}))

const Dashboard = () => {

  const classes = useStyles();

  return (
    <main className={classes.content}>
      <div className={classes.appBarSpacer}>
        <Container className={classes.container} maxWidth="lg">
          <Particles params={particlesConfig} className={classes.app_some} />
          <DashboardComponent />
        </Container>
      </div>
    </main>
  )
}


export default Dashboard