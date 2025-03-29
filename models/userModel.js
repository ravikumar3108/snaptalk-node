import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
    },
    // email: {
    //     type: String,
    //     unique: true
    // },
    username: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        minlenth: 6
    },
    gender: {
        type: String,
        enum: ["male", "female"]
    },
    profilePic: {
        type: String,
        default: ""
    }
})

const User = mongoose.model("User", userSchema)
export default User;