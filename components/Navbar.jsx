import React from 'react';
import Link from 'next/link';
import { AiOutlineShopping } from 'react-icons/ai';
import { useCartContext } from '../context/cart-context';
import Cart from './Cart';

const Navbar = () => {

  const { showCart, handleShowCart, totalQuantities } = useCartContext();
  return (
    <div className='navbar-container'>
      <p className='logo'>
        <Link href='/'>
          Aman Electronics
        </Link>
      </p>

      <button type='button' className='cart-icon' onClick={handleShowCart}>
        <AiOutlineShopping />
        <span className='cart-item-qty'>{totalQuantities}</span>
      </button>

      {showCart && <Cart />}
    </div>
  )
}

export default Navbar