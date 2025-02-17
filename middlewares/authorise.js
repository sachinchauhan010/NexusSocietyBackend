import jwt from 'jsonwebtoken';

export default function authorizeRoute(requiredRole) {
  return (req, res, next) => {
    console.log('Authorization Middleware - Headers:', req.headers);
    console.log('Authorization Middleware - Cookies:', req.cookies);

    const token = req.cookies?.token;

    if (!token) {
      console.log('Token not found in cookies');
      return res.status(401).json({
        success: false,
        message: 'Authentication token is missing'
      });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log('Decoded token:', decoded);

      if (decoded.role === requiredRole) {
        req.user = decoded;
        next();
      } else {
        return res.status(403).json({
          success: false,
          message: 'Insufficient permissions'
        });
      }
    } catch (error) {
      console.error('Token verification error:', error);
      return res.status(403).json({
        success: false,
        message: 'Invalid token'
      });
    }
  };
}