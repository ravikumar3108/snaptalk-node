import jwt from "jsonwebtoken"

let token;
const generateToken = (userId, res) => {
    // Create Token 
    // token takes 3 parameter a payload, a token secret, and a configuration object
    token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "7d"
    })
    // res.cookie("jwt", token, {
    //     // maximaim age pass into the string day,hour,min,sec,millisecond 
    //     maxAge: 7 * 24 * 60 * 60 * 1000,
    //     httpOnly: true   // prevent XSS attacks cross-site scripting attacks 
    // })

}
export { generateToken, token };