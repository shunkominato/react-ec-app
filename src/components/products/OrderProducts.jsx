import { Divider, List, ListItem, ListItemAvatar, ListItemText, makeStyles } from '@material-ui/core'
import { push } from 'connected-react-router';
import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux';
import { PrimaryButton } from '../UIkit';

const useStayles = makeStyles({
  list: {
    background: '#fff',
    height: 'auto'
  },
  image: {
    objectFit: 'cover',
    margin: '8px 16px 0',
    height: 96,
    width: 96
  },
  text: {
    width: 96
  }
})

const OrderProducts = (props) => {
  const classes = useStayles();
  const dispatch = useDispatch();
  const products = props.products

  const goToProductDatail = useCallback((id) => {
    dispatch(push('/product/' + id))
  })
  return (
    <List>
      {products.map(product => (
        <>
          <ListItem className={classes.list} key={product.id}>
            <ListItemAvatar>
              <img
                className={classes.image}
                src={product.images[0].path}
                alt={'Orderd Product'}
              />
            </ListItemAvatar>
            <div className={classes.text}>
              <ListItemText
                primary={product.name}
                secondary={'サイズ: ' + product.size}
              />
              <ListItemText
                primary={product.price}
                secondary={'サイズ: ' + product.size}
              />
            </div>
            <PrimaryButton
              label={'商品詳細'}
              onClick={() => goToProductDatail(product.id)}
            />
          </ListItem>
          <Divider/>
        </>
      ))}
    </List>
  )
}

export default OrderProducts
