import { Request, Response, NextFunction } from 'express';

/**
 * Admin Authorization Middleware
 * Prevents non-admin users from accessing sensitive database routes.
 */
export const adminOnly = (req: Request, res: Response, next: NextFunction) => {
    // In a real production app, I would verify a JWT token here.
    // For v2.0, we are checking the custom 'x-user-role' header.
    const userRole = req.headers['x-user-role'];

    if (userRole === 'admin') {
        console.log(`[Admin Access] Authorized request to: ${req.originalUrl}`);
        next(); // Proceed to the actual route (Seed, Clear, etc.)
    } else {
        console.warn(`[Security] Unauthorized Admin attempt from: ${req.ip}`);
        res.status(403).json({ 
            error: "Access Denied: You do not have permission to perform this action." 
        });
    }
};