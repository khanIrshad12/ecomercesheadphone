import {useEffect} from 'react'
import { useStateContext } from 'context/StateContext';
import Link from 'next/link';
import { FireWorks } from 'libs/utils';

import {BsBagCheckFill} from 'react-icons/bs'
const success = () => {
   
    const {setCartItems,setTotlePrice,setTotalQuantities}=useStateContext();
    useEffect(()=>{
        localStorage.clear();
        setCartItems([]);
        setTotlePrice(0);
        setTotalQuantities(0);
        FireWorks()
    },[])
  return (
    <div className='success-wrapper'>
        <div className='success'>
        <p className='icon'> <BsBagCheckFill/> </p>
        <h2>Thank You for your order!!</h2>
        <p className='email-msg'>Check Your email indox for the receipt</p>
        <p className='description'>If you have any question,Please Email <a className='email' href='mailto:order@example.com' >order@example.com</a></p>
        <Link href='/'>
        <button type='button' className='btn' width='300px' >
        Continue Shopping
         </button>
        </Link>
       
        </div>
    </div>
  )
}

export default success