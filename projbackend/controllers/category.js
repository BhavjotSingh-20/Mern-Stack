const Category = require("../models/category")

exports.getCategoryById = (req,res,next,id) => {
      Category.findById(id).exec((err,cate) => {
          if(err) {
              return res.status(400).json({
                  error:"Category not Found in DB"
              })
          }
          req.category = cate
      })
    next()
}



exports.createCategory = (req,res) => {
    const category = new Category(req.body)
    category.save((err,category) => {
        if(err) {
            return res.status(400).json({
                error:"NOT able to save Catgeory in DB"
            })
        }
        res.json({category})
    })
}

exports.getCategory = (req,res) => {
    return res.json(req.category)
}

exports.getAllCategory = (req,res) => {
     Category.find().exec((err,categories) => {
         if(err) {
             return res.status(400).json({
                 error:"No Category Found"
             })
         }
         res.json(categories)
     })
}


exports.updateCategory = (req,res) => {
    const category = req.category;
    category.name = req.body.name
    category.save((err,updatedcategory) => {
        if(err) {
            return res.status(400).json({
                error:"Failed to update Category"
            })
        }
        res.json(updatedcategory)

    })
}


exports.removeCategory = (req,res) => {
    const category = req.category
    category.remove((err,category) => {
        if(err) {
            return res.status(400).json({
                error:"Unable to delete Category"
            })
        }
        res.json({
            message:"Category deleted"
        })
    })
}