const multer = require("multer");
//model
const { FeedSchema } = require("../../models");
//config
const { security } = require("../../config");
const Bcrypt = require("bcrypt");
const { v1: UuidV1 } = require("uuid");

const { configFile } = require("../../utils");
const upload = configFile.single("image");

exports.post = async function (req, res, next) {
  upload(req, res, async function (error) {
    if (error instanceof multer.MulterError) {
      return res.answerWith(400, "File too large");
    } else if (error) {
        console.log(error)
      return res.answerWith(400, "Only allow jpg/jpeg, png");
    }

    // start session transaction
    const session = await FeedSchema.startSession();
    session.startTransaction({
      readConcern: { level: "snapshot" },
      writeConcern: { w: "majority" },
    });

    try {
      const { caption } = req.body;
      let image = !req.file ? "public/feeds" : req.file.path;
      const formData = {
        image: image,
        caption: caption,
      };

      // await db.create(formData, {session});
      const post = new FeedSchema(formData);

      // commit session transaction
      await post.save({ session });
      await session.commitTransaction();
      await session.endSession();
      return res.answerWith(200, "Post Created");
    } catch (error) {
      //abort if transactoin error
      await session.abortTransaction();
      await session.endSession();
      next(error);
    }
  });
};
