import React, { createContext,useState,useContext } from 'react';
import { toast } from 'react-hot-toast';
const Context=createContext();
export const StateContext=({children})=>{
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totlePrice, setTotlePrice] = useState(0)
    const [totalQuantities, setTotalQuantities] = useState(0);
    const [qty, setQty] = useState(1);
    let foundProduct;
    let index;
    const onAdd=(product,quantity)=>{
        const checkProductInCart=cartItems.find(item=>item._id == product._id);
        setTotlePrice(priviousPrice=>priviousPrice+product.price*quantity);
        setTotalQuantities(priviousQuantity=>priviousQuantity+quantity);
        if(checkProductInCart){
            
            const updatedCartItems=cartItems.map(cartProducts=>{
                if(cartProducts._id === product._id) return{
                    ...cartProducts,
                    quantity:cartProducts.quantity+quantity
                }         
            })
            setCartItems(updatedCartItems);
            
        }else{
            product.quantity=quantity;
            setCartItems([...cartItems,{...product}])
        }
        toast.success(`${qty} ${product.name} added to the Cart`)
    }

    const onRemove=(product)=>{
        foundProduct= cartItems.find(item=>item._id === product._id);
        const newCartItems=cartItems.filter((item)=>item._id !== product._id)
        setTotlePrice((preprice)=>preprice-foundProduct.price * foundProduct.quantity);
        setTotalQuantities(preQuantity=>preQuantity-foundProduct.quantity);
        setCartItems(newCartItems)

    }

    const toggaleCatItemQunatities=(id,value)=>{
       foundProduct= cartItems.find(item=>item._id === id);
       index=cartItems.findIndex(product=>product._id===id);
       
       if(value ==='inc'){
        setCartItems(cartItems.map(item=>{
            if(item._id === id){
                return {...item,quantity:item.quantity +1}
            }
            return item
        }),
        );
        setTotlePrice((prevtotalprice=>prevtotalprice+foundProduct.price));
        setTotalQuantities((prevQunatity)=>prevQunatity+1)
       }else if(value === 'dec'){
        if(cartItems.length >1){
        setCartItems(cartItems.map(item=>{
            if(item._id === id){
                return{...item,quantity:item.quantity-1}
            }
            return item
        }));
        setTotlePrice((prevtotalprice=>prevtotalprice-foundProduct.price));
        setTotalQuantities((prevQunatity)=>prevQunatity-1)
        }
       }
    }
    const incQty=()=>{
        setQty((previous)=>{
            return previous +  1;
        })
    }

    const decQty=()=>{
        setQty((previous)=>{
            if(previous -1 < 1) return 1;
            return previous -  1;
        })
    }

    return(
        <Context.Provider
        value={{
            showCart,
            setShowCart,
            cartItems,
            setCartItems,
            totalQuantities,
            setTotalQuantities,
            totlePrice,
            setTotlePrice,
            qty,
            incQty,
            decQty,
            onAdd,
            toggaleCatItemQunatities,
            onRemove,

        }}
        >
        {children}
        </Context.Provider>
    )
}
export const useStateContext=()=>useContext(Context);