import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"

import { cartEmpty, loadCart } from "./helper/CartHelper"
import { isAuthenticated} from "../auth/helper"
import DropIn from "braintree-web-drop-in-react"
import { getToken, processPayment } from "./helper/PayPalHelper"
import {createOrder} from "./helper/OrderHelper"



const PayPal = ({products,setReload = f => f,reload = undefined}) => {
    const [info,setInfo] = useState({
        loading:false,
        success:false,
        clientToken : null,
        error:"",
        instance:{}
    }) 
        const userId = isAuthenticated() && isAuthenticated().user._id
        const token = isAuthenticated() && isAuthenticated().token
    const getmeToken = (userId,token) => {

       getToken(userId,token).then(info => {
           console.log("INFO " , info)
          if(info.error) {
              setInfo({...info,error:info.error})
          } else {
              const clientToken = info.clientToken
              setInfo({clientToken})
          }
       }).catch()
    }
     
     const onPurchase = () => {
         setInfo({loading:true})
         let nonce;
         let getNonce = info.instance.requestPaymentMethod().then(data => {
             nonce = data.nonce
             const paymentData = {paymentMethodNonce:nonce,
             amount:getAmount()}
             processPayment(userId,token,paymentData).then(response => {
                 console.log("RESPONSE ",response)
                 const orderData = {
                     products:products,
                     transaction_id:response.transaction.id,
                     amount:response.transaction.amount
                 }
                  createOrder(userId,token,orderData)
                 cartEmpty(() => {
                     console.log("CART EMPTY")
                 })
                 setReload(!reload)
                 console.log("PAYMENT SUCCESS")
                 setInfo({...info,success:true,loading:false})
             }).catch(error => {
                     console.log(error)
                     setInfo({loading:false,error:error,success:false})
                 })
         }).catch()
     }
     const getAmount = () => {
         let amount =0 
         products.map((product) => {
           amount += product.price
         })
            return amount
     }
    const showbtDropIn = () => {
        return (
            <div>
                {info.clientToken !==null  && products.length > 0 ? (<div>
                    <DropIn options = {{authorization:info.clientToken}}
                    onInstance = {instance => (info.instance = instance)}/>
                    <button className="btn btn-success btn-block" onClick={onPurchase}>Buy</button></div>): (<div><h3>Please Login or add something to cart</h3></div>)
            }</div>
        )
    }
    useEffect(() => {
          getmeToken(userId,token)
    },[])
    return (
        <div>
            {showbtDropIn()}
        </div>
    )
}
export default PayPal