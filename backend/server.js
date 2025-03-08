import express from "express"
import dotenv from "dotenv"
import jwt from "jsonwebtoken"
dotenv.config()
import cookieParser from "cookie-parser"
import cors from "cors"
import User from "./models/userModel.js"
import bcrypt from "bcrypt"
import verifyToken from "./middlewares/authMiddleware.js"
import connectDB from "./config/db.js"
const app = express()

const PORT = 5000
connectDB()
app.use(cors(
    {
        origin: ["http://localhost:5173"],
        credentials : true
    }
))

app.use(express.json())
app.use(cookieParser())

app.post("/api/login", async (req, res) => {
    const { email, password } = req.body;
    
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "User by this email not found" });
        }

        const checkPassword = await bcrypt.compare(password, user.password);
        if (!checkPassword) {
            return res.status(401).json({ message: "Password incorrect" });
        }

        const token = jwt.sign(
            { id: user.id, name: user.name },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            maxAge: 3600 * 1000,
            sameSite: "None",
        });

        return res.status(200).json({
            message: "Successfully logged in",
            user: {
                email: user.email,
                name: user.name
            }
        });

    } catch (error) {
        console.error("Login error:", error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});


app.post("/api/register", async(req,res) => {
    const {name,email,password} = req.body
    try {
        const existingUser = await User.findOne({email})
        if(existingUser){
            return res.status(403).json({message: "user already exist"})
        }

        const hashPassword = await bcrypt.hash(password,10)
        
        const newUser = await User.create({
            email,
            password:hashPassword,
            name
        })

        res.status(201).json(newUser)
    } catch (error) {
        console.log(error.message)
    }
})


app.get("/api/user",  async(req,res) =>{
    try {
        const users = await User.find({})
        if(!users) {
            return res.status(404).json({message: "users not found"})
        }
        res.status(200).json(users)
    } catch (error) {
        console.log(error.message)

    }
})

// const generateToken = (res, id, role) => {
//     const token = jwt.sign({ id, role }, process.env.JWT_SECRET_KEY, {
//       expiresIn: '1d',
//     });
  
//     res.cookie("token", token, {
//       httpOnly: true, 
//       secure: process.env.NODE_ENV === "production",  
//       maxAge: 3600 * 1000,
//       sameSite: "None",
//     });
  
//     return token;
//   }
  
app.listen(PORT, () => {
    console.log(`server is listening on port ${PORT}`)
})









