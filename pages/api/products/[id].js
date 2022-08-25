import nc from 'next-connect';
import Product from '../../../models/Product';
import db from '../../../utils/db';
const handler = nc();

handler.get(async (req, res) => {
  await db.connect();
  //Product.find({}) return all products without filter
  const product = await Product.findById(req.query.id);
  await db.disconnect();
  res.send(product);
});
export default handler;
