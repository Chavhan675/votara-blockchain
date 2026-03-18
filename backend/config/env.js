require("dotenv").config()

module.exports = {
PORT: process.env.PORT,
MONGO_URI: process.env.MONGO_URI,
JWT_SECRET: process.env.JWT_SECRET,
RPC_URL: process.env.RPC_URL,
PRIVATE_KEY: process.env.PRIVATE_KEY
}