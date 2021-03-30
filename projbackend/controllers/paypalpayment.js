const braintree = require("braintree");

const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: "useYourMerchantId",
  publicKey: "useYourPublicKey",
  privateKey: "useYourPrivateKey"
});

exports.getToken = (req,res) => {
     gateway.clientToken.generate({
  
}, (err, response) => {
  // pass clientToken to your front-end
       if(err) {
           res.status(500).send(err)
       } else {
           res.send(response)
       }
});
}
exports.processPayment = (req,res) => {
    let nonceFromTheClient = req.body.paymentMethodNonce
    let amount = req.body.amount
   gateway.transaction.sale({
  amount: amount,
  paymentMethodNonce: nonceFromTheClient,
  options: {
    submitForSettlement: true
  }
}, (err, result) => {
     if(err) {
         res.status(500).json(err)
     } else {
        res.json(result)
     }
});
}

