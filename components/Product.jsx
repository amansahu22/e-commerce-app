import React from 'react'
import Link from 'next/link';
import { urlFor } from '../lib/client'

const Product = ({ product }) => {

  const { image, name, price, slug } = product
  const productImage = image ? urlFor(image[0]).url() : '';
  return (
    <div>
      <Link href={`/product/${slug?.current}`}>
        <div className='product-card'>
          <img
            src={productImage}
            alt={name}
            width={250}
            height={250}
            className='product-image'
          />
          <p className='product-name'>{name}</p>
          <p className='product-price'><span>&#8377; </span>{price}</p>
        </div>
      </Link>
    </div>
  )
}

export default Product