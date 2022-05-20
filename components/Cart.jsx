import React, { useRef } from 'react';
import Link from 'next/link';
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineLeft,
  AiOutlineShopping,
} from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti';
import toast from 'react-hot-toast';

import { useStateContext } from '../context/StateContext';
import { urlFor } from '../lib/client';
import getStripe from '../lib/getStripe';
import { FedaCheckoutButton, FedaCheckoutContainer } from 'fedapay-reactjs';
const Cart = () => {
  const cartRef = useRef();
  const {
    totalPrice,
    totalQuantities,
    cartItems,
    setShowCart,
    toggleCartItemQuanitity,
    onRemove,
  } = useStateContext();

  // const handleCheckout = async () => {
  //   alert('je dois remplacer par fedapay');
  // };
  // CHECKOUT WITH FEDAPAY
  const openFeda = () => {
    // console.log('le prixx', totalPrice);
    const fedaWindow = FedaPay.init({
      public_key: process.env.NEXT_PUBLIC_FEDAPAY_PUBLIC_KEY,
      transaction: {
        amount: 2800,
        description: 'Payer votre shopping!',
      },
      onComplete: ({ reason, transaction }) => {
        if (reason === FedaPay.DIALOG_DISMISSED) {
          alert('Vous avez fini la fenêtre de paiement !'); //info
        } else {
          console.log(transaction);
          alert('Merci pour votre shopping...'); //info
        }
      },
    });

    try {
      fedaWindow.open();
    } catch (e) {
      alert(e.message); //error
    }
  };
  return (
    <div className='cart-wrapper' ref={cartRef}>
      <div className='cart-container'>
        <button
          type='button'
          className='cart-heading'
          onClick={() => setShowCart(false)}
        >
          <AiOutlineLeft />
          <span className='heading'>Votre panier</span>
          <span className='cart-num-items'>({totalQuantities} produits)</span>
        </button>

        {cartItems.length < 1 && (
          <div className='empty-cart'>
            <AiOutlineShopping size={150} />
            <h3>Le panier est vide</h3>
            <Link href='/'>
              <button
                type='button'
                onClick={() => setShowCart(false)}
                className='btn'
              >
                Continuer le Shopping
              </button>
            </Link>
          </div>
        )}

        <div className='product-container'>
          {cartItems.length >= 1 &&
            cartItems.map((item) => (
              <div className='product' key={item._id}>
                <img
                  src={urlFor(item?.image[0])}
                  className='cart-product-image'
                />
                <div className='item-desc'>
                  <div className='flex top'>
                    <h5>{item.name}</h5>
                    <h4>{item.price}FCFA</h4>
                  </div>
                  <div className='flex bottom'>
                    <div>
                      <p className='quantity-desc'>
                        <span
                          className='minus'
                          onClick={() =>
                            toggleCartItemQuanitity(item._id, 'dec')
                          }
                        >
                          <AiOutlineMinus />
                        </span>
                        <span className='num' onClick=''>
                          {item.quantity}
                        </span>
                        <span
                          className='plus'
                          onClick={() =>
                            toggleCartItemQuanitity(item._id, 'inc')
                          }
                        >
                          <AiOutlinePlus />
                        </span>
                      </p>
                    </div>
                    <button
                      type='button'
                      className='remove-item'
                      onClick={() => onRemove(item)}
                    >
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
              <h3>Total:</h3>
              <h3>{totalPrice}FCFA</h3>
            </div>
            <div className='btn-container'>
              <button type='button' className='btn' onClick={openFeda}>
                Payer par FedaPay
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
