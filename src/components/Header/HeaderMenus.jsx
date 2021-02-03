import { Badge, IconButton } from '@material-ui/core'
import { Favorite, ShoppingCart, Menu } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { db } from '../../firebase'
import { fetchProductsInCart } from '../../reducks/users/operations'
import { getProductsInCart, getUserId } from '../../reducks/users/selectors'
import {push} from 'connected-react-router'

const HeaderMenus = (props) => {
  const dispatch = useDispatch();
  const selector = useSelector(state => state);
  let productsInCart = getProductsInCart(selector)
  const uid = getUserId(selector)

  // const [cart, setCart] = useState([])

  useEffect(() => {
    const unsubscribe = db.collection('users').doc(uid).collection('cart')
    .onSnapshot(snapshots => {
      snapshots.docChanges().forEach(change => {
        const product = change.doc.data();
        const changeType = change.type;

        switch (changeType) {
          case 'added':
            productsInCart.push(product)
            break;
          case 'modified':
            const index = productsInCart.findIndex(product => product.cartId === change.doc.id);
            productsInCart[index] = product;
            break;
          case 'removed':
            productsInCart = productsInCart.filter(product => product.cartId !== change.doc.id);
            break;
          default:
            break;
        }
      })
      dispatch(fetchProductsInCart(productsInCart));
    })

    return () => unsubscribe();
  }, [])
  return (
    <>
      <IconButton onClick={() => dispatch(push('/cart'))}>
        <Badge badgeContent={productsInCart.length} color="secondary">
          <ShoppingCart/>
        </Badge>
      </IconButton>

      <IconButton>
        <Favorite/>
      </IconButton>
      <IconButton onClick={(event) => props.handleDrawerTggle(event)}>
        <Menu/>
      </IconButton>

    </>
  )
}

export default HeaderMenus