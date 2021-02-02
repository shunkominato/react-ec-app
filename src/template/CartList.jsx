import { List } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { push } from 'connected-react-router'
import Recat, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CartListItem from '../components/products/CartListItems'
import { GrayButton, PrimaryButton } from '../components/UIkit'
import { getProductsInCart } from '../reducks/users/selectors'

const useStyles = makeStyles({
  root: {
    margin: '0 auto',
    maxWidth: 512,
    width: '100%'
  }
})

const CartList = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector(state => state)
  const productsInCart = getProductsInCart(selector)

  const goToOrder = useCallback(() => {
    dispatch(push('/order/confirm'))
  }, [])

  const backToHome = useCallback(() => {
    dispatch(push('/'))
  }, [])

  return (
    <section className='c-section-wrapin'>
      <h2 className='u-text__headline'>
        ショッピングカート
      </h2>
      <List className={classes.root}>
        {productsInCart.length > 0 && (
          productsInCart.map(product => <CartListItem key={product.cartId} product={product} />)
        )}
      </List>
      <div className='module-spacer--medium'/>
      <div className='p-grid__column'>
        <PrimaryButton label={'レジへ進む'} onClick={goToOrder} />
        <div className='module-spacer--medium'/>
        <GrayButton label={'ショッピングを続ける'} onClick={backToHome} />
      </div>
    </section>
  )
}

export default CartList