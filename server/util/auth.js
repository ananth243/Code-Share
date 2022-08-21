const { sign, verify } = require("jsonwebtoken");

module.exports.createJWT = (payload) => {
  const jwt = sign(payload, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  return jwt;
};

module.exports.decodeJWT = (jwt, next) => {
    try {
        const user = verify(jwt, process.env.JWT_SECRET);
        return user;
    } catch (error) {
        error.status=401;
        next(error);
    }
};
