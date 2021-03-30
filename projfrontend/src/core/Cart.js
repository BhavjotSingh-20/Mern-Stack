import React,{useState,useEffect} from 'react';
import "../styles.css"
import {API} from "../backend"
import Base from "./Base"
import Card from './Card';
import { getProducts } from './helper/coreapicalls';
import { loadCart } from './helper/CartHelper';
import StripeCheckout from './StripeCheckout';


function Cart() {
        const [products,setProducts] = useState([])
        const [reload,setReload] = useState(false)
        useEffect(() => {
            setProducts(loadCart())
        },[reload])
        const loadAllProducts = () => {
            return (
                <div>
                    <h2>This section is to load products</h2>
                    {products && products.map((product,index) => {
                    return <Card key={index} product={product} addToCart={false}
                     removeFromCart={true}
                     setReload={setReload}
                     reload={reload}/>
                    })}
                </div>
            )
        }
        const loadCheckout = () => {
            return (
                <div>
                    <h2>This section for checkout</h2>
                </div>
            )
        }

    
    return (
        <Base title="Cartpage" description="Ready to checkout" >
            <div className="row text-center ">
                <div className="col-6">{loadAllProducts()}</div>
                <div className="col-6"><StripeCheckout products={products} reload={reload}
                setReload={setReload}/></div>
            
            </div>
        </Base>
    );
}

export default Cart;