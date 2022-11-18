require('dotenv').config();

module.exports = {
    'mongoUrl': process.env.MONGO_DB_URL,
    'port': process.env.PORT,
    'SECRET':process.env.secret,
    // 'secretKey': process.env.JWTSECRET
}