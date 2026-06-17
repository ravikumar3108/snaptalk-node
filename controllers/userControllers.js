// import User from "../models/userModel.js"

// export const userGetForSlidebar = async (req, res) => {
//     try {
//         const loggedInUser = req.user._id
//         // console.log(loggedInUser)
//         // $ne is used for neglect the current user to find all user in our databases
//         // selecte method is used to remove the password data from the reasponse
//         const allUsers = await User.find({ _id: { $ne: loggedInUser } }).select("-password")
//         res.status(200).json(allUsers)
//     } catch (error) {
//         console.log("Errror in userGetForSlidebar", error)
//         res.status(400).json(error)
//     }
// }


import User from "../models/userModel.js";
import Message from "../models/messageModel.js";

export const userGetForSlidebar = async (req, res) => {
  try {
    const loggedInUser = req.user._id;

    const allUsers = await User.find({
      _id: { $ne: loggedInUser },
    }).select("-password");

    const usersWithLastMessage = await Promise.all(
      allUsers.map(async (user) => {
        const lastMessage = await Message.findOne({
          $or: [
            {
              senderId: loggedInUser,
              receiverId: user._id,
            },
            {
              senderId: user._id,
              receiverId: loggedInUser,
            },
          ],
        })
          .sort({ createdAt: -1 })
          .lean();

        const unreadCount = await Message.countDocuments({
          senderId: user._id,
          receiverId: loggedInUser,
          isRead: false,
        });

        return {
          ...user.toObject(),

          lastMessage: lastMessage?.message || "",

          lastMessageTime: lastMessage?.createdAt || null,

          unreadCount,
        };
      }),
    );

    res.status(200).json(usersWithLastMessage);
  } catch (error) {
    console.log("Errror in userGetForSlidebar", error);

    res.status(400).json(error);
  }
};
