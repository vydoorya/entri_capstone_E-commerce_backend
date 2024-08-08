import express from "express";
import productControllers from "../../controllers/productController.js";
const productRouter = express.Router();

productRouter.get("/",productControllers.ping);
productRouter.post("/create",productControllers.createProduct);
productRouter.get("/get-product/:id",productControllers.getProductById);
productRouter.get("/get-all-products",productControllers.getAllProducts);
productRouter.put("/update-product/:id",productControllers.updateProduct);
productRouter.delete("/delete-product/:id",productControllers.deleteProduct);


export default productRouter ;

