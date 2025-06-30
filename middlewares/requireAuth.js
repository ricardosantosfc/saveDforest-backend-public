module.exports = function requireAuth(req, res, next) {
  if (req.session.isAuthenticated === true) {
    return next();
  } else {
    console.log(`Unauthorized access attempt to ${req.originalUrl} by session: ${req.sessionID}`);
    return res.status(403).send({ message: "unauthorized access" });
  }
};