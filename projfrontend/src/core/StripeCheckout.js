import React,{useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import { cartEmpty, loadCart } from './helper/CartHelper';
import StripeCheckoutButton from "react-stripe-checkout"


const  StripeCheckout = ({products,setReload =f=>f,reload = undefined})  => {

    const [data,setData] = useState({
        loading:false,
        success:false,
        error:"",
        address:""
    })
    const token = isAuthenticated() && isAuthenticated().token 
    const userId = isAuthenticated() && isAuthenticated().user._id

    const getFinalAmount = () => {
       let amount =0;
       products.map(p => {
           amount += p.price
       })
       return amount
    }

    const makePayment = (token) => {
        //
    }
    const showStripeButton = () => {
        return isAuthenticated() ? (
            <StripeCheckoutButton stripeKey=""
            token={makePayment}
            amount={getFinalAmount() * 100} 
            name = "Buy Tshirt">
            <button className="btn btn-success">Pay with Stripe</button> </StripeCheckoutButton>
        ) : (<Link to="/signin"><button className="btn btn-warning">Signin</button></Link>)
    }
    return (
        <div>
            <h3 className="text-white">Stripe Checkout loaded {getFinalAmount()}</h3>
            {showStripeButton()}
        </div>
    );
}

export default StripeCheckout;