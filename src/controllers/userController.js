import User from "../models/userModel.js"
import generateToken from "../utils/generateToken.js";
import bcrypt from 'bcrypt'

const ping = (req,res)=>{
  res.json({message:"sucessfully routed user-router"});
};

const signup = async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body
    // console.log(email);

    const userExist = await User.findOne( {email} );
    
    
    if (userExist) {
      return res.json({message:"User is already exist"});
    }
    
    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
      email,
      firstName,
      lastName,
      hashPassword,
    });
    
    const newUserCreated = await newUser.save();

    if (!newUserCreated) {
      return res.json({message:"user is not created"});
    }

    const token = generateToken(email);
    
    res.cookie("token", token)
    res.json({message:"Signed successfully!"});
  } catch (error) {
    // console.log(error, "Something wrong");
    res.status(500).json({message:"Internal Server Error"});
  }
};

const signin = async (req,res)=>{
  try{
    const {email,password} = req.body
    // console.log(email);
    const user = await User.findOne({email});
    if(!user){
      return res.json({message:"User Not Found"});
    }
    const matchPassword = await bcrypt.compare(password, user.hashPassword);
    if(!matchPassword){
      return res.json({message:"Password Not Match"});
    }
    const token = generateToken(email);
    res.cookie(token);
    res.json({message:"Sucessfully Login"});
  } catch(error){
    // console.log(error,"something Went Wrong");
    res.status(500).json({message:"Internal Server Error"});
  }
};

const updateUser = async (req, res) => {
    try {
      const { firstName, lastName } = req.body;
      const {id} = req.params
      const updatedUser = await User.findByIdAndUpdate(
       { _id:id},
        { firstName, lastName },
        { new: true }
      );
      if (!updatedUser) return res.status(404).json({ message: "User not found" });
      res.status(200).json(updatedUser);
    } catch (error) {
      // console.log("error",error);
      
      res.status(500).json({ message: "updation failed "});
    }
  };

  const getAllUsers = async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json([users]);
    } catch (error) {
      res.status(500).json({ message:"unexpeted error" });
    }
  };

  // const getUserById = async (req, res) => {
  //   try {
  //     const {id} = req.params.id
  //     const user = await User.findById(id);
  //     if (!user) return res.status(404).json({ message: "User not found" });
  //     res.status(200).send(user);
  //   } catch (error) {
  //     res.status(500).json({ message:"cant find user" });
  //   }
  // };

  const getUserById = async (req, res) => {
    try {
      const id = req.params.id
      const user = await User.findById(id);
      if (!user) return res.status(404).json({ message: "User not found" });
      res.status(200).json({user});
    } catch (error) {
      res.status(500).json({ message:"cant find user" });
    }
  };

  const userControllers = {
    ping,
    signup,
    signin,
    updateUser,
    getAllUsers,
    getUserById

  }

  export default userControllers ;
