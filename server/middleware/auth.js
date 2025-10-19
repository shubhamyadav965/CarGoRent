import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) =>{
    // Get token from Authorization header (Bearer token)
    const authHeader = req.headers.authorization;
    
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.json({
            success:false,
            message:"Not authorized, no token"
        })
    }
    
    const token = authHeader.split(' ')[1]; // Extract token after "Bearer "
    
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
        console.error('Auth error:', error.message);
        return res.json({
            success:false,
            message:"Not authorized, token failed"
        })
    }
}