import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) =>{
    const token = req.headers.authorization; // Get token from headers
    if(!token){
        return res.json({
            success:false,
            message:"Not authorized, no token"
        })
    }
    try{
        const userId = jwt.verify(token, process.env.JWT_SECRET);
        if(!userId){
            return res.json({
                success:false,
                message:"Not authorized, invalid token"
            })
        }
        req.user = await User.findById(userId).select('-password'); // Attach user to request object, excluding password
        next();
    } catch(error){
        return res.json({
            success:false,
            message:"Not authorized, token failed"
        })
    }
}