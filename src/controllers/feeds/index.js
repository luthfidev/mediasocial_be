//model
const { FeedSchema } = require("../../models");
//config
const { v1: UuidV1 } = require("uuid");

exports.get = async function (req, res, next) {
  try {
    const { email, password } = req.body;
    // const search = username.length > 0 ? {username: username, isDeleted: false} : {};

    const data = await FeedSchema.find({});

    res.data = {
      data: data,
    };

    return res.answerWith(200, "List Post");
  } catch (error) {
    next(error);
  }
};
