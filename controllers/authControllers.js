import express from 'express'
import User from '../models/userModel.js'
import bcrypt from "bcryptjs"
import { generateToken, token } from '../utils/generateToken.js'


export const signUpUser = async (req, res) => {
    console.log(req.body)
    try {
        const { fullname, username, password, confirmPassword, gender, profilePic, } = req.body

        if (password !== confirmPassword) {
            return res.status(201).json({ error: "Password don't Match" })
        }

        else {
            const user = await User.findOne({ username })
            if (user) {
                res.status(201).json({ message: "User already registered", status: false })
            }
            else {
                // HASH PASSWORD HERE
                // we can generate a salt asynchronously using the bcrypt. genSalt() function. This salt will be unique for each password hash, enhancing security: bcrypt.
                const salt = await bcrypt.genSalt(10)
                const hashedPassword = await bcrypt.hash(password, salt)

                // https://avatar.iran.liara.run/public
                // this Api is used to take avatar images

                const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`
                const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`

                const newUser = new User({
                    fullname: fullname,
                    username: username,
                    password: hashedPassword,
                    gender: gender,
                    profilePic: gender === "male" ? boyProfilePic : girlProfilePic
                })

                if (newUser) {
                    generateToken(newUser._id)
                    await newUser.save()
                    res.status(201).json({
                        status: true,
                        message: newUser,
                        token: token
                    })
                } else {
                    res.status(400).json({ error: "Invalid user data" })
                }
            }
        }

    } catch (err) {
        console.log("Error in Signup", err)
        res.status(500).json(err)
    }
}

export const loginUser = async (req, res) => {
    // res.json({message:"login"})
    try {
        const { username, password } = req.body
        const existUser = await User.findOne({ username : username })
        const isPasswordCoorect = await bcrypt.compare(password, existUser?.password || "");

        if (!existUser || !isPasswordCoorect) {
            res.json({ error: "username and Password is incorrect", })
        }
        else {
            generateToken(existUser._id)
            res.status(200).json({
                status: true,
                user: existUser,
                _id: existUser._id,
                fullname: existUser.fullname,
                username: existUser.username,
                token: token
            })

        }
    } catch (err) {
        console.log("Errror in login", err)
        res.status(500).json(err)
    }
}

export const logoutUser = async (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 })
        res.status(200).json({ message: "Logged out successfully" })
    } catch (err) {
        console.log("Errror in logout", err)
        res.status(500).json(err)
    }
}

export const profile = async (req, res, next) => {
    if (req.user) {
        res.json({
            status: true,
            user: req.user
        })
    } else {
        res.json({
            status: false,
            user: null
        })
    }

}
export const dumy = async (req, res, next) => {
    res.json({message:"helooo"})

}

