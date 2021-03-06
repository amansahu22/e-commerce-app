import React, { useRef } from 'react';
import { useCartContext } from '../context/cart-context';
import { AiOutlineMinus, AiOutlinePlus, AiOutlineLeft, AiOutlineShopping } from 'react-icons/ai';

import { TiDeleteOutline } from 'react-icons/ti'
import toast from 'react-hot-toast';
import Link from 'next/link';
import { urlFor } from '../lib/client';
import getStripe from '../lib/getStripe';

const Cart = () => {
    const cartRef = useRef();
    const { cartItems, totalPrice, totalQuantities, handleHideCart, deleteCartProduct, updateCartItemQuantity } = useCartContext();

    const handleCheckout = async () => {
        //get instance of stripe
        const stripe = await getStripe();
        const response = await fetch('/api/stripe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cartItems)
        });

        if (response.statusCode === 500) return;
        const data = await response.json();
        toast.loading('Redirecting....');
        stripe.redirectToCheckout({ sessionId: data.id });
    };

    return (
        <div className='cart-wrapper' ref={cartRef}>
            <div className='cart-container'>
                <button type='button' className='cart-heading' onClick={handleHideCart}>
                    <AiOutlineLeft />
                    <span className='heading'>Your cart</span>
                    <span className='cart-num-items'>( {totalQuantities} items )</span>
                </button>

                {cartItems.length < 1 && (
                    <div className='empty-cart'>
                        <AiOutlineShopping size={150} />
                        <h3>Your shopping cart is empty &#128532;</h3>

                        <Link href='/'>
                            <button type='button' className='btn' onClick={handleHideCart}>
                                Shop now!
                            </button>
                        </Link>
                    </div>
                )}

                <div className='product-container'>
                    {cartItems.length >= 1 && cartItems.map((product, index) => (
                        <div className='product' key={product?._id}>
                            <img
                                src={urlFor(product?.image[0])}
                                alt='Product'
                                className='cart-product-image'
                            />
                            <div className='item-desc'>
                                <div className='flex top'>
                                    <h5>{product?.name}</h5>
                                    <h4>&#8377; {product?.price}</h4>
                                </div>
                                <div className='flex bottom'>
                                    <div>
                                        <p className='quantity-desc'>
                                            <span className="minus" onClick={() => {
                                                updateCartItemQuantity(product?._id, 'dec')
                                            }}>
                                                <AiOutlineMinus />
                                            </span>

                                            <span className="num">{product?.quantity}</span>

                                            <span className="plus" onClick={() => {
                                                updateCartItemQuantity(product?._id, 'inc')
                                            }}>
                                                <AiOutlinePlus />
                                            </span>
                                        </p>
                                    </div>
                                    <button type='button' className='remove-item' onClick={() => deleteCartProduct(product)}>
                                        <TiDeleteOutline />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {cartItems.length >= 1 && (
                    <div className='cart-bottom'>
                        <div className='total'>
                            <h3>Subtotal</h3>
                            <h3>&#8377; {totalPrice}</h3>
                        </div>
                        <div className='btn-container'>
                            <button type='button' className='btn' onClick={handleCheckout}>Pay with Stripe</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Cart