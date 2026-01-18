// const jwt = require("jsonwebtoken");

// module.exports = (req, res, next) => {
//   const token = req.headers.authorization?.split(" ")[1];
//   if (!token) return res.sendStatus(401);

//   const decoded = jwt.verify(token, process.env.JWT_SECRET);
//   req.user = decoded;
//   next();
// };

module.exports = (req, res, next) => {
  // TEMPORARY BYPASS FOR API TESTING
  req.user = { id: "695d4f07bd0d44d25e622730" };
  next();
};
