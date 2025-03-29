import User from "../models/userModel.js"
import jwt from "jsonwebtoken"

// export const protectRoute = async (req, res, next) => {
//     try {
//         let token = req.cookies.jwt
//         if (!token) {
//             return res.status(401).json({ error: "Unauthorised : Token Missing" })
//         }

//         const decode = jwt.sign(token, process.env.JWT_SECRET)
//         if (!decode) {
//             return res.status(401).json({ error: "Unauthorised : Invalid Token" })
//         }
//         // console.log("uuuuuuuuuuuuuuu", userId)
//         const user = await User.findById(decode.userId).select("-password")
//         // .selecte method is used to remove the password 
//         if (!user) {
//             return res.status(401).json({ error: "User is not found" })
//         }

//         req.user = user
//         next()

//     } catch (error) {
//         console.log("middleware error protect route", error)
//         res.status(400).json("Error found in Route validator", error)
//     }
// }



export const protectRoute = async (req, res, next) => {
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer")) {
      token = authHeader.split(" ")[1];
      jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (decoded) {
          let result = await User.findOne({ "_id": decoded.userId });
          req.user = result;
          next();
        } else {
          console.log("err", err)
          next()
        }
      });
      if (!token) {
        res.status({
          status: false,
          msg: "token missing"
        });
        throw new Error("User is not authorized or token is missing");
      }
    } else {
      res.status({
        status: false,
        msg: "something wrong"
      });
    }
  };
