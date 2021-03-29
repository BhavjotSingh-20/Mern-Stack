const Product = require("../models/product")
const formidable = require("formidable")
const _ = require("lodash")
const fs = require("fs")

exports.getProductById = (req,res,next,id)  => {
    Product.findById(id).populate("category").exec((err,product) => {
        if(err) {
            return res.status(400).json({
                error:"Product not Found"
            })
        }
        req.product = product
        next();
    })
}

exports.createProduct = (req,res) => {
    // console.log(req.body)
    let form = new formidable.IncomingForm()
    form.KeepExtensions = true
    console.log(req.body)
    form.parse(req,(err,fields,file) => {
        if(err) {
            return res.status(400).json({
                error:"problem with image"
            })
        }
        const {name,description,price,category,stock} = fields
        if(!name || !description || !price || !category || !stock) {
             return res.status(400).json({
                 error:"Please include all fields"
             })
        }
        var product =  new Product(fields)
    //    console.log(product)
      //  console.log(file)
        //handling file
        if(file.photo) {
            if(file.photo.size > 3000000) {
                return res.status(400).json({
                    error:"File size too big!"
                })
            }
            product.photo.data = fs.readFileSync(file.photo.path)
            product.photo.contentType = file.photo.type
        } 
        console.log("product" + product)
        product.markModified('mixed')
        product.save((err,prod) => {
            if(err) {
              console.log(err)
                 res.status(400).json({
                    error:"Unable to add Product"
                })
            }
            console.log("hi there")
            res.json(prod)
            
        })
    })
}

exports.getProduct = (req,res) => {
    req.product.photo = undefined
    return res.json(req.product)
}

//middleware
exports.photo = (req,res,next) => {
    if(req.product.photo.data) {
        res.set("Content-Type",req.product.photo.contentType)
        return res.send(req.product.photo.data)
    }
    next()
}

exports.deleteProduct = (req,res) => {
     let product = req.product
     product.remove((err,deletedProduct) => {
         if(err) {
             return res.status(400).json({
                 error:"Unable to Delete Product"
             })
         }
         res.json({
             message:"Deletion was successful"
         })
     })
}

exports.updateProduct = (req,res) => {
         let form = new formidable.IncomingForm()
    form.KeepExtensions = true
    console.log(req.body)
    form.parse(req,(err,fields,file) => {
        if(err) {
            return res.status(400).json({
                error:"problem with image"
            })
        }
        
        var product =  req.product
      product = _.extend(product,fields)
        if(file.photo) {
            if(file.photo.size > 3000000) {
                return res.status(400).json({
                    error:"File size too big!"
                })
            }
            product.photo.data = fs.readFileSync(file.photo.path)
            product.photo.contentType = file.photo.type
        } 
        console.log("product" + product)
        product.markModified('mixed')
        product.save((err,prod) => {
            if(err) {
              console.log(err)
                 res.status(400).json({
                    error:"Updation of Product Failed",
                    err
                })
            }
            console.log("hi there")
            res.json(prod)
            
        })
    })
}

exports.getAllProducts = (req,res) => {
    let limit = req.query.limit ? parseInt(req.query.limit) : 8 
    let sortBy = req.query.sortBy ?  req.query.sortBy  :  "_id"
    Product.find().select("-photo").populate("category").sort([[sortBy,"asc"]]).limit(limit).exec((err,products) => {
        if(err) {
            console.log(err)
            res.status(400).json({
                error:"No Product Found",
                err
            })
        }
        res.json(products)
    })
}

exports.updateStock = (req,res,next) => {
    let myOperations = req.body.order.products.map(prod => {
        return {
            updateOne: {
                filter : {_id:prod._id},
                update:{$inc:{stock:-prod.count,sold:+prod.count}}
            }
        }
    })
    Product.bulkWrite(myOperations,{},(err,products) => {
    if(err) {
        res.status(400).json({
            error:"BulkOperations Failed",
            err
        })
    }
    
    })
    next()
}


exports.getAllUniqueCategories = (req,res) => {
    Product.distinct("category",{},(err,category) => {
        if(err) {
            return res.status(400).json({
                error:"NO Category found"
            })
        }
        res.json(category)
    })
}