import {Link,NavLink} from 'react-router-dom';
import {createPortal} from 'react-dom';
import {MapPin,Search,ShoppingBag,Menu,X} from 'lucide-react';
import {useEffect,useState} from 'react';
import {useCart} from '../context/CartContext';

const links=[['/','Home'],['/menu','Menu'],['/about','About'],['/#offers','Offers'],['/#gallery','Gallery'],['/contact','Contact']];

export default function Navbar({openCart}){
  const [open,setOpen]=useState(false);
  const {count}=useCart();
  useEffect(()=>{
    if(!open) return;
    const previous=document.body.style.overflow;
    document.body.style.overflow='hidden';
    const onKey=e=>{if(e.key==='Escape') setOpen(false)};
    window.addEventListener('keydown',onKey);
    return()=>{document.body.style.overflow=previous;window.removeEventListener('keydown',onKey)};
  },[open]);
  const drawer=createPortal(<><button className={`nav-backdrop ${open?'show':''}`} onClick={()=>setOpen(false)} aria-label="Close navigation" tabIndex={open?0:-1}/><nav className={`mobile-drawer ${open?'open':''}`} aria-label="Mobile navigation" aria-hidden={!open}><div className="drawer-head"><span>Explore Food Villa</span><button className="icon-btn mobile-close" onClick={()=>setOpen(false)} aria-label="Close menu"><X/></button></div><div className="drawer-links">{links.map(([to,label])=><NavLink key={label} to={to} onClick={()=>setOpen(false)} tabIndex={open?0:-1}>{label}</NavLink>)}</div><Link className="btn drawer-order" to="/menu" onClick={()=>setOpen(false)} tabIndex={open?0:-1}>Order Online</Link></nav></>,document.body);
  return <><header className="nav"><Link to="/" className="brand"><b>FOOD VILLA</b><small>GOOD FOOD • GREAT MOOD</small></Link><nav className="desktop-nav">{links.map(([to,label])=><NavLink key={label} to={to}>{label}</NavLink>)}</nav><div className="nav-actions"><span className="location"><MapPin size={16}/> Asansol</span><Link className="icon-btn search-link" to="/menu" aria-label="Search menu"><Search/></Link><button className="icon-btn cart-btn" onClick={openCart} aria-label={`Open cart with ${count} items`}><ShoppingBag/><em>{count}</em></button><Link className="btn order" to="/menu">Order Online</Link><button className="icon-btn hamburger" onClick={()=>setOpen(true)} aria-label="Open menu" aria-expanded={open}><Menu/></button></div></header>{drawer}</>;
}
