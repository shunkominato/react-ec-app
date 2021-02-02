import {db, FirebaseTimeStamp} from '../../firebase/'
import {push} from 'connected-react-router'
import { fetchProductsAction, deleteProductAction } from './actions';

const productsRef = db.collection('products');

export const saveProducts = (id, name, description, category, gender, price, images, sizes) => {
    return async (dispatch) => {
        const timestamp = FirebaseTimeStamp.now()

        const data = {
            name,
            description,
            category,
            gender,
            price: parseInt(price, 10),
            images,
            sizes,
            updated_at: timestamp
        }

        if(!id){
            const ref = productsRef.doc()
            id = ref.id
            data.id = id
            data.created_at = timestamp
        }


        return productsRef.doc(id).set(data, {marge: true})
                .then(() => {
                    dispatch(push('/'))
                }).catch((e) => {
                    console.log(e)
                    throw new Error(e)
                })
    }
}

export const fetchProducts = () => {
    return async (dispatch) => {
        productsRef.orderBy('updated_at', 'desc').get()
        .then(snapshots => {
            const productList = []
            snapshots.forEach(snapshot => {
                const product = snapshot.data()
                productList.push(product)
            })
            dispatch(fetchProductsAction(productList))
        })
    }
}

export const deleteProducts = (id) => {
    return async (dispatch, getState) => {
        productsRef.doc(id).delete()
        .then(() => {
            const prevProducts = getState().products.list
            const newProducts = prevProducts.filter((item) => id !== item.id)
            dispatch(deleteProductAction(newProducts))
        })
    }
}

export const orderProduct = (productsInCart, amount) => {
    return async (dispatch, getState) => {
        console.log(']]]]]]]]]]]]]]]]]]]]]')
        const uid = getState().users.uid;
        const userRef = db.collection('users').doc(uid);
        const timestamp = FirebaseTimeStamp.now();

        let amount = 0,
            products = [],
            soldOutProducts = [];
        
        const batch = db.batch()
        for(const product of productsInCart){
            
            const snapshot = await productsRef.doc(product.productId).get();
            const sizes = snapshot.data().sizes;
            console.log(sizes)
            console.log(product)
            const updatedSizes = sizes.map(size => {
                console.log('uuuuuuuu')
                if(size.size === product.size){
                    if (size.quantity === 0) {
                        soldOutProducts.push(product.name);
                        return size
                    }
                    console.log('iiiiiiii')
                    console.log(size.quantity - 1)
                    return {
                        size: size.size,
                        quantity: size.quantity - 1
                    }
                } else {
                    
                    return size
                }
            })
            products.push({
                id: product.productId,
                images: product.images,
                name: product.name,
                price: product.price,
                size: product.size
            })

            batch.update(productsRef.doc(product.productId), {sizes: updatedSizes})

            batch.delete(
                userRef.collection('cart').doc(product.cartId)
            )
        }

        if(soldOutProducts.length > 0){
            const errorMessage = (soldOutProducts.length > 1) ? 
                                    soldOutProducts.join('と') : 
                                    soldOutProducts[0];
            alert('大変申し訳ありません。' + errorMessage + 'が在庫切れとなってしまったため、注文処理をちゅうだんしました。')
            return false
        } else {
                batch.commit()
                .then(() => {
                    const orderRef = userRef.collection('orders').doc();
                    const date = timestamp.toDate();
                    const shippingDate = FirebaseTimeStamp.fromDate(new Date(date.setDate(date.getDate() + 3)));

                    const history = {
                        amount: amount,
                        created_at: timestamp,
                        id: orderRef,
                        products: products,
                        shipping_date: shippingDate,
                        update_at: timestamp
                    }

                    orderRef.set(history)
                    // dispatch(push('/'))
                })
        }

    }
}

