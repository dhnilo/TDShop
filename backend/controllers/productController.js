import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js"


// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => { 
  const pageSize = process.env.PAGINATION_LIMIT;
  const page = Number(req.query.pageNumber) || 1;
  
 const { keyword } = req.query;
 let query = {};

 if(keyword) {
    const categories = await Product.find().distinct('category');
    if(categories.some(category => category.toLowerCase().includes(keyword.toLowerCase()))) {
      query.category = { 
          $regex: keyword, 
          $options: 'i' 
        } 
    } else { 
        query.name = { 
        $regex: keyword, 
        $options: 'i' 
      }
    }
  }

  const count = await Product.countDocuments({ ...query });
  const products = await Product.find({ ...query })
    .limit(req.query.limit)
    .skip(req.query.skip);

  res.json({ products });
});

// @desc    Fetch a product
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => { 
  const product = await Product.findById(req.params.id);

  if (product) {
    return res.json(product);
  } else {
    res.status(404);
    throw new Error('Resource not found');
  }
});

export { getProducts, getProductById };