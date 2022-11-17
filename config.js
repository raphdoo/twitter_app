require('dotenv').config();

module.exports = {
    'mongoUrl': process.env.MONGO_DB_URL,
    'port': process.env.PORT,
    // 'secretKey': process.env.JWTSECRET
}