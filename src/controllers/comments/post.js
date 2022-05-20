//model
const { CommentSchema, UserSchema } = require("../../models");
//config
// const { security } = require("../../config");
// const Bcrypt = require("bcrypt");
const { v1: UuidV1 } = require("uuid");

exports.post = async function (req, res, next) {

   // start session transaction
  const session = await CommentSchema.startSession();
  session.startTransaction({
    readConcern: { level: "snapshot" },
    writeConcern: { w: "majority" },
  });

  try {
    const { email, feedId, text } = req.body;


    const formData = {
      feedId: feedId,
      text: text,
    };

    if (
      !await UserSchema.findOne({ email: email }).session(session)
    ) {
      await session.abortTransaction();
      return res.answerWith(400, "User Not Found");
    }
    // await db.create(formData, {session});
    const comment = new CommentSchema(formData);

    // commit session transaction
    await comment.save({ session });
    await session.commitTransaction();
    await session.endSession();
    return res.answerWith(200, "Comment Created");
  } catch (error) {
    //abort if transactoin error
    await session.abortTransaction();
    await session.endSession();
    next(error);
  }
};
