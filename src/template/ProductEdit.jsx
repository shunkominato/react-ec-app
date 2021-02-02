import React, {useState, useCallback, useEffect} from 'react'
import { TextInput, SelectBox, PrimaryButton } from '../components/UIkit'
import { ImageArea, SetSizeArea } from '../components/products'
import {saveProducts} from '../reducks/products/operations.js'
import {useDispatch} from 'react-redux'
import { db } from '../firebase'


const ProductEdit = () => {
	const dispatch = useDispatch()
	let id = window.location.pathname.split('product/edit')[1]

	if(id){
		id = id.split('/')[1]
	}


	const [name, setName] = useState(''),
				[description, setDescription] = useState(''),
				[category, setCategory] = useState('a'),
				[categories, setCategories] = useState([]),
				[gender, setGender] = useState(''),
				[images, setImages] = useState([]),
				[price, setPrice] = useState(0),
				[sizes, setSizes] = useState([])

	const inputName = useCallback((event) => {
		setName(event.target.value)
	}, [setName])

	const inputDescription = useCallback((event) => {
		setDescription(event.target.value)
	}, [setDescription])

	const selectCategory = useCallback((event) => {
		setCategory(event.target.value)
	}, [setCategory])

	const selectGender = useCallback((value) => {
		setGender(value)
	}, [setGender])

	const inputPrice = useCallback((event) => {
		setPrice(event.target.value)
	}, [setPrice])


	const genders = [
		{id: 'men', name: '男'},
		{id: 'women', name: '女'},
	]

	useEffect(() => {
		if(id){
			db.collection('products').doc(id).get()
			.then(snapshot => {
				const data = snapshot.data()
				setName(data.name)
				setDescription(data.description)
				setCategory(data.category)
				setGender(data.gender)
				setImages(data. images)
				setPrice(data. price)
				setSizes(data.sizes)
			})
		}
	}, [id])

	useEffect(() => {
		console.log('categooooo')
		db.collection('categories').get()
		.then((snapShots) => {
			const list = []
			snapShots.forEach((snapShot) => {
				const data = snapShot.data()
				list.push({
					id: data.id,
					name: data.name
				})
			})
			console.log(list)
			setCategories(list)
		})
	}, [])

	return (
		<section>
			<h2 className='u-text__headline u-text-center'>商品の登録・削除</h2>
			<div className='c-section-container'>
				<ImageArea images={images} setImages={setImages} />
				<TextInput
					fullWidth={true} label={'商品名'} multiline={false} required={true}
					onChange={inputName} rows={1} value={name} type={'text'}
				/>

				<TextInput
					fullWidth={true} label={'商品説明'} multiline={true} required={true}
					onChange={inputDescription} rows={5} value={description} type={'text'}
				/>

				<SelectBox
					label={'カテゴリー'} required={true} option={categories}
					select={setCategory} value={category}
				/>

				<SelectBox
					label={'性別'} required={true} option={genders}
					select={setGender} value={gender}
				/>

				<TextInput
					fullWidth={true} label={'商品価格'} multiline={false} required={true}
					onChange={inputPrice} rows={1} value={price} type={'number'}
				/>

			</div>
			<div className='module-spacer-medium'></div>
			<SetSizeArea sizes={sizes} setSizes={setSizes}></SetSizeArea>
			<div className='module-spacer-medium'></div>
			<div className='center'>
				<PrimaryButton
					label={'商品情報を保存'} onClick={() => dispatch(saveProducts(id, name, description, category, gender, price, images, sizes))}
				/>
			</div>
		</section>
	)
}

export default ProductEdit