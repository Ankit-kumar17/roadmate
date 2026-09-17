const  jwt = require("jsonwebtoken");

const authMiddleware = (req,res,next) => {
console.log("middleware running");

next();
}

module.exports = authMiddleware;