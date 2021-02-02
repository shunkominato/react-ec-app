import React, {useCallback} from 'react'
import IconButton from '@material-ui/core/IconButton';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import {makeStyles} from '@material-ui/styles'
import {storage} from '../../firebase/index'
import ImagePreview from './ImagePreview';
// import {ImagePreview} from './ImagePreview'

const useStyles = makeStyles({
	icon:{
		height:48,
		width: 48
	}
})

const ImageArea = (props) => {
	const classes = useStyles()

	const	uploadImage = useCallback((event) => {
		console.log(event)
		const file = event
		let blob = new Blob(file, {type:"image/jpeg"})
		const S="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
		const N=16;
		const fileName = Array.from(crypto.getRandomValues(new Uint32Array(N))).map((n) => S[n%S.length]).join('')

		const uploadRef = storage.ref('image').child(fileName)
		const uploadTask = uploadRef.put(blob)

		uploadTask.then(() => {
			uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
				const newImage = {id: fileName, path: downloadURL}
				props.setImages((prevState => [...prevState, newImage]))
			})
		})
	}, [props.setImages])

	const deleteImage = useCallback(async (id) => {
		console.log(id)
		const ret = window.confirm('削除しますか？')
		if(!ret){
			return false
		}

		const newImage = props.images.filter((image) => image.id !== id)
		props.setImages(newImage)
		return storage.ref('image').child(id).delete()
	}, [props.setImages])

	return (
		<div>
			<div className="p-grid__list-images">
				{props.images.length > 0 && (
					props.images.map(image => <ImagePreview id={image.id} path={image.path} key={image.id} delete={deleteImage}/>)
				)}
			</div>
			<div className='u-text-right'>
				<span>商品画像を登録する</span>
				<IconButton className={classes.icon}>
					<label>
						<AddPhotoAlternateIcon/>
						<input className="u-display-none" type="file" id="image" onChange={(event) => uploadImage(event.target.files)}/>
						{/* <input className="u-display-none" type="file" id="image" onChange={(event) => console.log(event.target.files)}/> */}
					</label>
				</IconButton>
			</div>
		</div>
	)

}

export default ImageArea