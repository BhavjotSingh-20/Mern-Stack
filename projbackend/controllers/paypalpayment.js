const braintree = require("braintree");

const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.MERCHENT_KEY,
  publicKey: process.env.PUBLIC_KEY,
  privateKey: process.env.PRIVATE_KEY
});

exports.getToken = (req,res) => {
     gateway.clientToken.generate({
  
}, function(err, response) {
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
}, function(err, result) {
     if(err) {
         res.status(500).json(err)
     } else {
        res.json(result)
     }
});
}

