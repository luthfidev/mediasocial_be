const multer = require('multer')

const storage = multer.diskStorage({
  destination: function (request, file, callback) {
    callback(null, './public/feeds')
  },
  filename: function (request, file, callback) {
    callback(null, Date.now() + file.originalname.toString().toLowerCase())
  }
})
const fileFilter = (request, file, callback) => {
  if (file.originalname.toLowerCase().match(/\.(jpg|jpeg|png)$/)) {
    callback(null, true)
  } else {
    return callback(new Error('Only image files are allowed!'), false)
  }
}

const configFile = multer({
  storage: storage,
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: fileFilter
})
module.exports = configFile