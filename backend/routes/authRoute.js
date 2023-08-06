import express from "express";
import {forgotPasswordController, loginController, registerController, testController} from "../controllers/authController.js"
import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js";

// router object
const router = express.Router();

// routing
// REGISTER || METHOD POST

router.post('/register', registerController);

// LOGIN || METHOD POST
router.post('/login', loginController);

// Forgot Password || Post
router.post('/forgot-password', forgotPasswordController)

// Test Route
router.get('/test', requireSignIn, isAdmin, testController);


// Protected route auth
router.get('/user-auth', requireSignIn, (req, res) => {
    res.status(200).send({ok : true});
})

export default router;