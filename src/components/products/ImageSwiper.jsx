import React, { useState } from 'react'
import Swiper from 'react-id-swiper'
import noImage from '../../assets/img/src/no_image.png'
import 'swiper/css/swiper.css'

const ImageSwipwer = (props) => {
  const [params] = useState({
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true,
      dynamicBullets: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    loop: true
  })

  const images = props.images

  return (
    <Swiper {...params}>
      {images.length === 0 ? (
        <div className='p-media__thumb'>
          <img src={noImage} />
        </div>
      ) : (
        images.map(image => (
          <div>
            <img src={image.path} />
          </div>
        ))
      )}
    </Swiper>
  )
}

export default ImageSwipwer