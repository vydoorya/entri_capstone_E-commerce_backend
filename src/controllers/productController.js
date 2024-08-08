import Product from "../models/productModel.js"

const ping = (req,res)=>{
    res.json({message:"Router hitted"});
}
const createProduct = async (req, res) => {
    const { name, description, price, category, stock } = req.body;
  
    try {
      // console.log(name, description, price, category, stock);
  
      const newProduct = new Product({
        name,
        description,
        price,
        category,
        stock
      });
  
      await newProduct.save();
      res.status(201).json({message:"product created",newProduct});
    } catch (error) {
      res.status(400).json({ message:"product not created"});
    }
  };


const getAllProducts = async (req, res) => {
    try {
      const products = await Product.find()
      res.status(200).json([products]);
    } catch (error) {
      res.status(500).json({ message:"products not find"});
    }
  };

const getProductById = async (req, res) => {
    const { id } = req.params;
  
    try {
      // console.log(id);
  
      const product = await Product.findById(id)
      if (!product) return res.status(404).json({ message: "Product not found" });
  
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const {name,description,price,category,stock} = req.body;
  
    try {
      // console.log(id,name,description,price,category,stock);
  
      const updatedProduct = await Product.findByIdAndUpdate(
        {_id:id},
        {
            name,
            description,
            price,
            category,
            stock
        },
        { new: true });
      if (!updatedProduct) return res.status(404).json({ message: "Product not found" });
  
      res.status(200).json(updatedProduct);
    } catch (error) {
      res.status(500).json( {message:"product not updated"} );
    }
  };

  const deleteProduct = async (req, res) => {
    const { id } = req.params;
  
    try {
      // console.log(id);
  
      const deletedProduct = await Product.findByIdAndDelete(id);
      if (!deletedProduct) return res.status(404).json({ message: "Product not found" });
  
      res.status(200).json({ message: "Product deleted" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message:"product not deleted" });
    }
  };

  const productControllers = {
    ping,
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
  }

  export default productControllers ; 
