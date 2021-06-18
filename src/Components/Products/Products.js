import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ProductListing from './ProductListing';
import { getTasks } from '../../Reducers/Index';


import { Grid } from '@material-ui/core'

const ProductsPage = () => {
  const dispatch = useDispatch();
  const something_else = useSelector((state) => state.indexReducer);

  useEffect(() => {
    dispatch(getTasks());
  }, []);

  return (
    <Grid container spacing={2}>
      <ProductListing />
    </Grid>
  )
}


export default ProductsPage;