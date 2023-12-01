const jwt = require("jsonwebtoken");
require("dotenv/config");

module.exports = async (req, res, next) => {
    let token = req.headers.cookie

    if (!token) {
        return res.status(401).json({ error: "Token não foi encontrado" });
    }

    token = token.replace('Session=', '')

    await jwt.verify(token, process.env.TOKEN_KEY, (error, data) =>{
        if (error) {
            return res.status(500).json({ error: "Token inválido ou já expirou" });
        }else{
            return next();
        }
    })
};
