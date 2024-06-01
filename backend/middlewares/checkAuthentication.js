import jwt from 'jsonwebtoken'

const checkAuthentication = (req, res, next) => {
    console.log("Checking Authentication")
    try {
        const token = req.cookies.token

        if(!token) {
            return res.status(401).json({
                success: false,
                message: "You are not Authenticated!"
            })}

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
        if(!decodedToken) {
            return res.status(401).json({
                success: false,
                message: "Token Invalid!"
            })
        }
        req.userId = decodedToken.userId
        next()
    }
    catch (err) {
        console.log("Something went wrong")
        res.status(401).json({
            success: false,
            message: "Something went wrong!"
        });
    }
}

export default checkAuthentication