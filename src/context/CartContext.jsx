import {createContext,useContext,useMemo,useState} from 'react';
const CartContext=createContext();
export function CartProvider({children}){const [items,setItems]=useState([]); const add=item=>setItems(x=>{const hit=x.find(i=>i.id===item.id);return hit?x.map(i=>i.id===item.id?{...i,qty:i.qty+1}:i):[...x,{...item,qty:1}]}); const change=(id,d)=>setItems(x=>x.map(i=>i.id===id?{...i,qty:i.qty+d}:i).filter(i=>i.qty>0)); const remove=id=>setItems(x=>x.filter(i=>i.id!==id)); const value=useMemo(()=>({items,add,change,remove,count:items.reduce((n,i)=>n+i.qty,0),subtotal:items.reduce((n,i)=>n+i.price*i.qty,0)}),[items]);return <CartContext.Provider value={value}>{children}</CartContext.Provider>}
export const useCart=()=>useContext(CartContext);
