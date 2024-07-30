import admin from "../firebaseAdmin.js";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig.js";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/errorHandler.js";

export const register = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    // create user in firebase auth service
    const userCredential = await admin.auth().createUser({
      email,
      password,
      displayName: name,
    });

    // Save user in database MongoDB
    const newUser = new User({
      uid: userCredential.uid,
      email: userCredential.email,
      name: userCredential.displayName,
    });
    await newUser.save();

    // Send response
    res
      .status(201)
      .json({ message: "User created successfully", success: true });
  } catch (error) {
    console.log(error?.code);
    if (error?.code === "auth/email-already-exists") {
      return next(errorHandler(409, "Email already in use"));
    }
    return next(errorHandler(500, error.message));
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    // Login user with firebase auth service
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = userCredential.user;
    const token = await user.getIdToken();

    // Send response
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      })
      .status(200)
      .json({
        message: "User logged in successfully",
        success: true,
        user: {
          uid: user.uid,
          name: user.displayName,
          email: user.email,
        },
      });
  } catch (error) {
    // Handle firebase auth errors
    if (error.code === "auth/invalid-credential") {
      return next(errorHandler(401, "Invalid email or password"));
    }
    return next(error);
  }
};
