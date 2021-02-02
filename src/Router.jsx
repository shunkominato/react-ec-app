import React from 'react'
import {BrowserRouter,Switch, Route} from 'react-router-dom'
import {login, home, SignUp, SignIn, Reset, ProductEdit, ProductList, ProductDetail, CartList, OrderHistory} from './template'
import Auth from './Auth'
import OrderConfirm from './template/OrderConfirm'

const Router = () => {
	return(
		<React.Fragment>
			<Switch>
				<Route exact path={"/login"} component={login} />
				<Route exact path={'/signup'} component={SignUp} />
				<Route exact path={'/signin'} component={SignIn} />
				<Route exact path={'/Reset'} component={Reset} />

				<Route path={"/product/edit/(:id)?"} component={ProductEdit} />
				<Auth>
					<Route exact path="(/)?" component={ProductList} />
					<Route exact path={'/product/:id'} component={ProductDetail} />
					<Route exact path={'/cart'} component={CartList} />
					<Route exact path={'/order/confirm'} component={OrderConfirm} />
					<Route exact path={'/order/history'} component={OrderHistory} />
				</Auth>
			</Switch>
		</React.Fragment>
	)
}

export default Router