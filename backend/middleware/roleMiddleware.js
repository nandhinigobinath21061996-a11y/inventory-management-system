const authorize = (...roles) => {
  return (req, res, next) => {
    console.log("User:", req.user);
    console.log("Role:", req.user.role);

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: "Access denied",
      });
    }

    next();
  };
};

module.exports = authorize;