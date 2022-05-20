const config = {
    JWT: {
        key : process.env.JWT_KEY,
        algorith : 'HS256'
    },
    bcrypt: {
        saltRounds: 10
    }
}

module.exports = config;
