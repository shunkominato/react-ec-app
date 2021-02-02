import { Divider, List, makeStyles } from '@material-ui/core'
import React, { useCallback } from 'react'
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CartListItems } from '../components/products';
import { PrimaryButton, TextDetail } from '../components/UIkit';
import { orderProduct } from '../reducks/products/operations';
import { getProductsInCart } from '../reducks/users/selectors';

const useStayles = makeStyles((theme) => ({
  detailBox: {
    margin: '0 auto',
    [theme.breakpoints.down('sm')]: {
      width: 320
    },
    [theme.breakpoints.down('sm')]: {
      width: 320
    }
  },
  orderBox: {
    border: '1px solid rgba(0,0,0,0,2)',
    borderRadius: 4,
    boxShadow: '0 4px 2px 2px rgba(0,0,0,0,2)',
    height: 256,
    margin: '24px auto 16px',
    padding: 16,
    width: 288
  }
}))

const OrderConfirm = () => {
  const classes = useStayles();
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const productsInCart = getProductsInCart(selector);

  const sumTotal = useMemo(() => {
    return productsInCart.reduce((sum, product) => sum += product.price, 0)
  }, [productsInCart])

  const shippingFee = (sumTotal >= 10000) ? 0 : 210;

  const tax = sumTotal * 0.1
  const total = sumTotal + shippingFee + tax
  const order = useCallback(() => {
    dispatch(orderProduct(productsInCart, total))
  }, [productsInCart, total])

  return (
    <section className='c-section-wrapin'>
      <h2 className='u-text__headline'>注文の確認</h2>
      <div className='p-grid__row'>
        <div className={classes.detailBox}>
          <List>
            {productsInCart.length > 0 && (
              productsInCart.map(product => <CartListItems product={product} key={product.cartId} />)
            )}
          </List>
        </div>
        <div className={classes.orderBox}>
          <TextDetail label={'商品合計'} value={'¥' + sumTotal.toLocaleString()}/>
          <TextDetail label={'消費税'} value={'¥' + tax.toLocaleString()}/>
          <TextDetail label={'送料'} value={'¥' + shippingFee.toLocaleString()}/>
          <Divider/>
          <TextDetail label={'商品合計'} value={'¥' + total.toLocaleString()}/>
          <PrimaryButton label={'注文する'} onClick={order}/>
        </div>
      </div>
    </section>
  )

}

export default OrderConfirm