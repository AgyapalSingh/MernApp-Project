import { comparePassword, hashPassword } from '../helpers/authHelper.js';
import userModel from '../models/userModel.js';
import JWT from 'jsonwebtoken';


// 1. REGISTER CONTROLLER

export const registerController = async(req, res) =>{
    try {
        const {firstName, lastName, email, password, phoneNumber, address, answer} = req.body

        // validations
        if(!firstName){
            return res.send({error: 'First Name is Required'})
        }
        if(!lastName){
            return res.send({error: 'Last Name is Required'})
        }
        if(!email){
            return res.send({error: 'Email is Required'})
        }
        if(!password){
            return res.send({error: 'Password is Required'})
        }
        if(!phoneNumber){
            return res.send({error: 'Phone Number is Required'})
        }
        if(!address){
            return res.send({error: 'Address is Required'})
        }
        if(!answer){
            return res.send({error: 'Answer is Required'})
        }


        // Check User
        const exisitingUser = await userModel.findOne({email})

        // Check Exisiting User
        if(exisitingUser){
            return res.status(200).send({
                success: false,
                message: "Already Register Please Login"
            })
        }


        // Register User
        const hashedPassword = await hashPassword(password);

        // save
        const user = await new userModel({firstName, lastName, email, phoneNumber, address, password:hashedPassword, answer}).save()

        res.status(201).send({
            success: true,
            message: "User Registered Successfully",
            user
        })


    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Registration",
            error
        })
    }
}



// 2. LOGIN CONTROLLER
export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        //validation - CHECK EMAIL AND PASSWORD
        if (!email || !password) {
            return res.status(404).send({
                success: false,
                message: "Invalid email or password",
            });
        }
        //check user
        const user = await userModel.findOne({ email: req.body.email });
        if (!user) {
            return res.status(200).send({
                success: false,
                message: "Email is not registered",
            });
        }
        const match = await comparePassword(password, user.password);
        if (!match) {
            return res.status(200).send({
                success: false,
                message: "Invalid Password",
            });
        }
        //token - 
        const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });
        res.status(200).send({
            success: true,
            message: "login successfully",
            user: {
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                phone: user.phone,
                address: user.address,
                role: user.role,
            },
            token,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in login",
            error,
        });
    }
};


// 3. ForgotPasswordController
export const forgotPasswordController = async(req, res) =>{
    try {
        const {email, answer, newPassword } = req.body

        // validation
        if(!email){
            res.status(400).send({message: 'Email is required'})
        }
        if(!answer){
            res.status(400).send({message: 'Answer is required'})
        }
        if(!newPassword){
            res.status(400).send({message: 'New Password is required'})
        }

        // check
        const user = await userModel.findOne({email, answer})

        // validation
        if(!user){
            return res.status(404).send({
                success: false,
                message: 'Wrong Email or Answer'
            })
        }

        const hashed = hashPassword(newPassword)
        await userModel.findByIdAndUpdate(user._id, {password: hashed})
        res.status(200).send({
            success: true,
            message: "Password Reset Successfully"
        });

        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Something went wrong',
            error
        })
    }
}

// Test Controller
export const testController = (req, res) =>{
    res.send("Protected Route")
}