const jwt = require('jsonwebtoken');

const authenticateToken = (handler) => {
  return async (req, res) => {
    try {
      const authHeader = req.headers.authorization;
      const token = authHeader && authHeader.split(' ')[1];

      if (!token) {
        return res.status(401).json({ error: 'Access token required' });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      
      return handler(req, res);
    } catch (error) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
  };
};

module.exports = { authenticateToken };