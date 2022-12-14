import { ClassNames } from '@emotion/react';
import {
  FormControl,
  FormControlLabel,
  List,
  ListItem,
  Radio,
  RadioGroup,
  Typography,
} from '@material-ui/core';
import Cookies from 'js-cookie';
import { Router, useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import React, { useContext, useEffect, useState } from 'react';
import CheckoutWizard from '../components/CheckoutWizard';
import Layout from '../components/layout';
import { Store } from '../utils/Store';
import useStyles from '../utils/styles';

export default function Payment() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const classes = useStyles('');
  const { router } = useRouter();
  const { paymentMethod, setPaymentMethod } = useState('');
  const { state, dispatch } = useContext(Store);
  const {
    cart: { shippingAddress },
  } = state;
  // useEffect(() => {
  // !shippingAddress.address) badalha
  //   if (shippingAddress.address) {
  //     router.push('/shipping');
  //   } else {
  //     setPaymentMethod(Cookies.get('paymentMethod' || ''));
  //   }
  // }, []);
  const submitHandler = (e) => {
    closeSnackbar();
    e.preventDefault();
    if (!paymentMethod) {
      enqueueSnackbar('Payment method is required', { variant: 'error' });
    } else {
      dispatch({ type: 'SAVE_PAYMENT_METHOD', payload: paymentMethod });
      Cookies.set('paymentMethod', paymentMethod);
      router.push('/placeorder');
    }
  };
  return (
    <Layout title="payment Method">
      <CheckoutWizard activeStep={2} />
      <form className={classes.form} onSubmit={submitHandler}>
        <Typography component="h1" variant="h1">
          payment Method
        </Typography>
        <List>
          <ListItem>
            <FormControl component="fieldset">
              <RadioGroup
                aria-label="Payment Method"
                name="paymentMethod"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <FormControlLabel
                  label="PayPAl"
                  value="PAyPal"
                  control={<Radio />}
                ></FormControlLabel>
                <FormControlLabel
                  label="Stripe"
                  value="Stripe"
                  control={<Radio />}
                ></FormControlLabel>{' '}
                <FormControlLabel
                  label="Cash"
                  value="Cash"
                  control={<Radio />}
                ></FormControlLabel>
              </RadioGroup>
            </FormControl>
          </ListItem>
          <ListItem fullWidth type="submit" variant="contained" color="primary">
            {' '}
            Continue{' '}
          </ListItem>
          <ListItem>
            <ListItem
              fullWidth
              type="button"
              variant="contained"
              onClick={() => router.push('/shipping')}
            >
              {' '}
              Back{' '}
            </ListItem>
          </ListItem>
        </List>
      </form>
    </Layout>
  );
}
