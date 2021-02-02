import { List, makeStyles } from '@material-ui/core'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { OrderHistoryItem } from '../components/products'
import { fetchOrdersHistory } from '../reducks/users/operations'
import { getOrdersHistorys } from '../reducks/users/selectors'



const useStayles = makeStyles((theme) => ({
  orderList: {
    background: theme.palette.grey['100'],
    margin: '0 auto',
    padding: 32,
    [theme.breakpoints.down('md')]: {
      width: '100%'
    },
    [theme.breakpoints.up('md')]: {
      width: 768
    }
  }
}))

const OrderHistory = () => {
  const dispatch = useDispatch()
  const classes = useStayles();
  const selector = useSelector(state => state)
  const orders = getOrdersHistorys(selector)

  useEffect(() => {
    dispatch(fetchOrdersHistory())
  }, [])


  return (
    <section className='c-section-wrappin'>
      <List className={classes.orderList}>
      {orders.length > 0 && (
        orders.map((order) => <OrderHistoryItem order={order} key={order.id}/>)
      )}
      </List>
    </section>
  )
}

export default OrderHistory
