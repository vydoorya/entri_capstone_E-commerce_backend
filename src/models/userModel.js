import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        email:{
            type:String,
            require:true,
            unique:true,
            minLength:3,
            maxLength:30,
        },
        hashPassword:{
            type:String,
            require:true,
            minLength:6,
        },
        firstName:{
            type:String,
            require:true,
            maxLength:50,
        },
        lastName:{
            type:String,
            require:true,
            maxLength:50,
        },
        orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
        cart: { type: mongoose.Schema.Types.ObjectId, ref: "Cart" },
        wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
        reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
    },
    { timestamps:true }
);
const User = mongoose.model("User", userSchema);

export default User;