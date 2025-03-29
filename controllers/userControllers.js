import User from "../models/userModel.js"

export const userGetForSlidebar = async (req, res) => {
    try {
        const loggedInUser = req.user._id
        // console.log(loggedInUser)
        // $ne is used for neglect the current user to find all user in our databases
        // selecte method is used to remove the password data from the reasponse 
        const allUsers = await User.find({ _id: { $ne: loggedInUser } }).select("-password")
        res.status(200).json(allUsers)
    } catch (error) {
        console.log("Errror in userGetForSlidebar", error)
        res.status(400).json(error)
    }
}