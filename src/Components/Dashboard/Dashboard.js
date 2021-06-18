import React, { Fragment } from 'react';
import Chart from './Charts';
import Deposits from './Deposits';
import Orders from './Orders';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Grid } from '@material-ui/core';



const useStyles = makeStyles((theme) => ({

  paper: {
    padding: theme.spacing(2),
    marginTop: theme.spacing(4),
    display: "flex",
    overflow: 'auto',
    flexDirection: 'column'
  },
  fixedHeight: {
    height: 240
  }
}));




const DashboardComponent = () => {
  const classes = useStyles();

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight)

  return (
    <Fragment>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8} lg={8}>
          <Paper className={fixedHeightPaper}>
            <Chart />
          </Paper>
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
          <Paper className={fixedHeightPaper}>
            <Deposits />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Orders />
          </Paper>
        </Grid>
      </Grid>
    </Fragment>

  )
}

export default DashboardComponent;