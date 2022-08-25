import React from 'react';
import NextLink from 'next/link';
//import { useRouter } from 'next/dist/client/router';
//import data from '../../utils/data';
import Layout from '../../components/layout';
import db from '../../utils/db';
import Product from '../../models/Product';
import axios from 'axios';
import { useContext } from 'react';
import { Store } from '../../utils/Store';
import { useRouter } from 'next/dist/client/router';
import {
  Grid,
  Link,
  List,
  ListItem,
  Typography,
  Button,
} from '@material-ui/core';
import useStyles from '../../utils/styles';
import Image from 'next/dist/client/image';
export default function ProductScreen(props) {
  const { product } = props;
  const classes = useStyles();
  const { dispatch } = useContext(Store);
  const router = useRouter();
  // static data  is now replaced by db
  // const router = useRouter();
  // const { slug } = router.query;
  //  const product = data.products.find((a) => a.slug === slug);
  if (!product) {
    return (
      <Typography>
        <div>Product Not Found </div>
      </Typography>
    );
  }
  const addToCardHandler = async () => {
    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data.countInStock <= 0) {
      window.alert('Sorry . product is out of stock');
      return;
    }
    dispatch({
      type: 'CART_ADD_ITEM',
      playload: { ...product, quantity: 1 },
    });
    router.push('/cart');
  };

  return (
    <Layout title={product.name} description={product.description}>
      <div className={classes.section}> </div>
      <Grid container spacing={1}>
        <Grid item md={6} xs={12}>
          <Image
            src={product.image}
            alt={product.name}
            width={640}
            height={640}
            layout="responsive"
          ></Image>
        </Grid>
        <Grid item md={3} xs={12}>
          <List>
            <ListItem>
              <Typography component="h1" variant="h1">
                {product.name}
              </Typography>
            </ListItem>
            <ListItem>
              <Typography>category : {product.category}</Typography>
            </ListItem>
            <ListItem>
              <Typography> brand : {product.brand}</Typography>
            </ListItem>
            <ListItem>
              <Typography>
                Raiting :{product.rating} stars ({product.numReviews} reviews)
              </Typography>
            </ListItem>
            <ListItem>
              <Typography> Description :{product.description}</Typography>
            </ListItem>
          </List>
        </Grid>
        <Grid item md={3} xs={12}>
          <List>
            <ListItem>
              <Grid item xs={6} className={classes.grid}>
                <Typography>Price</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>$ {product.price}</Typography>
              </Grid>
            </ListItem>
            <ListItem>
              <Grid item xs={6}>
                <Typography>Status</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>
                  {product.countInStock > 0 ? 'In stock' : 'Unavailable'}
                </Typography>
              </Grid>
            </ListItem>
            <ListItem>
              <Button
                type="button"
                fullWidth
                variant="contained"
                color="primary"
                onClick={addToCardHandler}
              >
                Add to cart
              </Button>
            </ListItem>
          </List>
        </Grid>
      </Grid>
      <NextLink href="/" passHref>
        <Typography>
          <Link>back to products</Link>
        </Typography>
      </NextLink>
    </Layout>
  );
}
export async function getServerSideProps(context) {
  const { params } = context;
  const { slug } = params;
  await db.connect();
  const product = await Product.findOne({ slug }).lean();
  await db.disconnect();
  return {
    props: {
      product: db.convertDocToObj(product),
    },
  };
}
