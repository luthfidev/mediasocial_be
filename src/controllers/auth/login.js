//model
const { UserSchema } = require("../../models");
//config
const { security } = require("../../config");
const Bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')
const { v1: UuidV1 } = require("uuid");

exports.post = async function (req, res, next) {
  try {

    const {email, password} = req.body
    // const search = username.length > 0 ? {username: username, isDeleted: false} : {};

    const isExistEmail = await UserSchema.find({email: email})

    if(isExistEmail.length > 0) {

        const checkPassowrd = Bcrypt.compareSync(password, isExistEmail[0].password) 
        if (!checkPassowrd) {
            return res.answerWith(401, 'Not Authorized')
        }
        const payload = {
            id: isExistEmail[0]._id,
            email: isExistEmail[0].email,
        }
        const token = jwt.sign(payload, security.JWT.key);
        res.data = {
            data: {
                payload
            },
            token: token,
        };
        return res.answerWith(200, 'User login');
    }

  } catch (error) {
    next(error);
  }
};
