import React,{useRef} from 'react'
import Link from 'next/link';
import { AiOutlineMinus,AiOutlinePlus,AiOutlineLeft,AiOutlineShopping } from 'react-icons/ai';
import {TiDeleteOutline} from 'react-icons/ti';
import { urlFor } from 'libs/client';
import getStripe from 'libs/getStripe';
import toast from 'react-hot-toast';
import { useStateContext } from 'context/StateContext';

const Cart = () => {
  const cartRef=useRef();
  const {totlePrice,totalQuantities,cartItems,setShowCart,toggaleCatItemQunatities,onRemove}=useStateContext()

  const handleCheckout=async()=>{
    
  const stripe=await getStripe();
  const response= await fetch('/api/stripe',{
    method:'POST',
    headers:{
      'Content-Type':'application/json',
    },
    body:JSON.stringify(cartItems),
  });

  

  if(response.statusCode === 500) return;
  
  const data=await response.json();
  
  toast.loading('Redirecting...');
  stripe.redirectToCheckout({sessionId : data.id})

  }
  return (
    <div className='cart-wrapper' ref={cartRef}>
    <div className='cart-container'>
    <button
    type='button'
    className='cart-heading'
    onClick={()=>setShowCart(false)}
    >
    <AiOutlineLeft />
    <span className='heading'>Your Cart</span>
    <span className='cart-num-items'>({totalQuantities} items)</span>
    </button>
    {cartItems.length <1 && (
      <div className='empty-cart'>
        <AiOutlineShopping size={250}/>
         <h3>Your Shopping bag is empty</h3>
         <Link href='/'>
         <button
         type='button'
         className='btn'
         onClick={()=>setShowCart(false)}
         >
          Continue Shopping
         </button>
         </Link>
        
      </div>
    )}
    <div className='product-container'>
      {cartItems.length>=1 && cartItems.map(item=>(
        <div className='product' key={item._id}>
          <img src={urlFor(item?.image[0])} 
            className="cart-product-image"/>
          <div className='item-desc'>
          <div className='flex top'>
          <h5>{item.name}</h5>
          <h4>{item.price}</h4>
          </div>
          <div className='flex bottom'>
          <div>
          <p className='quantity-desc'>
                <span className='minus' onClick={()=>toggaleCatItemQunatities(item._id,'dec')}><AiOutlineMinus /></span>
                <span className='num' >{item.quantity}</span>
                <span className='plus' onClick={()=>toggaleCatItemQunatities(item._id,'inc')}><AiOutlinePlus /></span>        
            </p> 
          </div>
          <button type='button' className='remove-item'  onClick={()=>onRemove(item)} >
            <TiDeleteOutline/>
            </button>
          </div>
          </div>
          </div>
        ))
      }
      </div>
    {cartItems.length >=1 && (
      <div className='cart-bottom'>
      <div className='total'>
        <h3>Subtotal:</h3>
        <h3>${totlePrice}</h3>
      </div>
      <div className='btn-container'>
      <button type='button' onClick={handleCheckout}  className='btn'>Pay with Stripe</button>
      </div>
      
      </div>
    )}
    
    </div>
    </div>
  )
}

export default Cart