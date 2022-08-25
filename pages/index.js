import Layout from '../components/layout';
import NextLink from 'next/link';
import {
  Button,
  CardActionArea,
  CardActions,
  CardMedia,
  Grid,
  Typography,
} from '@mui/material';
import data from '../utils/data';
import { Card } from '@material-ui/core';
import db from '../utils/db';
import Product from '../models/Product';
import axios from 'axios';
import { useContext } from 'react';
import { Store } from '../utils/Store';
import { useRouter } from 'next/router';

export default function Home() {
  const { dispatch } = useContext(Store);
  const router = useRouter();

  const addToCardHandler = async (product) => {
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
    <Layout>
      <div>
        <h1>Products</h1>
        <Grid container spacing={8}>
          {data.products.map((product) => (
            <Grid item md={4} key={product.name}>
              <Card>
                <NextLink href={`/product/${product.slug}`} passHref>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      image={product.image}
                      title={product.name}
                    ></CardMedia>
                  </CardActionArea>
                </NextLink>
                <CardActions>
                  <Typography>{product.price} </Typography>
                  <Button
                    size="small"
                    color="primary"
                    onClick={() => addToCardHandler(product)}
                  >
                    Add to cart
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </Layout>
  );
}
export async function getServerSideProps() {
  await db.connect();
  // lean tell Mongoose to skip intantiating a full Mongoose document just give you the pojo (erreur de serialisation)
  const products = await Product.find({}).lean();
  await db.disconnect();
  return {
    props: {
      products: products.map(db.convertDocToObj),
    },
  };
}
