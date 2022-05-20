//model
const { UserSchema } = require("../../models");
//config
const { security } = require("../../config");
const Bcrypt = require("bcrypt");
const { v1: UuidV1 } = require("uuid");

exports.post = async function (req, res, next) {

   // start session transaction
  const session = await UserSchema.startSession();
  session.startTransaction({
    readConcern: { level: "snapshot" },
    writeConcern: { w: "majority" },
  });

  try {
    const { email, username, password } = req.body;

    const passwordHash = await Bcrypt.hashSync(password, security.bcrypt.saltRounds)

    const formData = {
      email: email,
      username: username,
      password: passwordHash,
    };

    if (
      await UserSchema.findOne({ username: formData.username }).session(session)
    ) {
      await session.abortTransaction();
      return res.answerWith(400, "Users exist");
    }
    // await db.create(formData, {session});
    const user = new UserSchema(formData);

    // commit session transaction
    await user.save({ session });
    await session.commitTransaction();
    await session.endSession();
    return res.answerWith(200, "Users Created");
  } catch (error) {
    //abort if transactoin error
    await session.abortTransaction();
    await session.endSession();
    next(error);
  }
};
